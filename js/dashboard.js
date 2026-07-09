/* Stackly Dashboard JS - Navigation and Charts Control */

$(document).ready(function() {
  // 0. Update User Profiles from session details
  const loggedInUser = localStorage.getItem('loggedInUser');
  const loggedInEmail = localStorage.getItem('loggedInUserEmail');
  if (loggedInUser) {
    $('.user-display-name').text(loggedInUser);
    $('input[name="fullname"], #profile-name').val(loggedInUser);
  }
  if (loggedInEmail) {
    $('input[name="email"], #profile-email').val(loggedInEmail);
  }

  // 1. Sidebar toggle on mobile
  $('.dashboard-toggle-btn').on('click', function() {
    $('.dashboard-sidebar').toggleClass('show');
  });

  // 2. Sidebar Navigation Scroll Interceptor
  $('.dashboard-nav-link').on('click', function(e) {
    e.preventDefault();
    const targetId = $(this).attr('data-target');
    
    // Highlight active link
    $('.dashboard-nav-link').removeClass('active');
    $(this).addClass('active');

    // Scroll right content panel to section
    const targetSection = $('#' + targetId);
    if (targetSection.length) {
      const scrollContainer = $('.dashboard-content-area');
      const targetTop = scrollContainer.scrollTop() + targetSection.position().top - 20;
      
      scrollContainer.animate({
        scrollTop: targetTop
      }, 500);
    }

    // Auto close sidebar on mobile viewport
    if ($(window).width() < 992) {
      $('.dashboard-sidebar').removeClass('show');
    }
  });

  // 3. Highlight Sidebar items on Scroll
  $('.dashboard-content-area').on('scroll', function() {
    const scrollContainer = $(this);
    const scrollPos = scrollContainer.scrollTop();

    $('.dashboard-section').each(function() {
      const section = $(this);
      const top = section.position().top + scrollContainer.scrollTop() - 100;
      const bottom = top + section.outerHeight();

      if (scrollPos >= top && scrollPos < bottom) {
        const id = section.attr('id');
        $('.dashboard-nav-link').removeClass('active');
        $(`.dashboard-nav-link[data-target="${id}"]`).addClass('active');
      }
    });
  });

  // 4. Intercept all placeholder button clicks on dashboards to redirect to 404
  $('.dashboard-content-area').on('click', '.btn-dummy-action', function(e) {
    e.preventDefault();
    
    // Find closest container that might hold an associated input (cell <td>, input-group, or parent div)
    let container = $(this).closest('.input-group');
    if (!container.length) {
      container = $(this).closest('td');
    }
    if (!container.length) {
      container = $(this).parent();
    }
    
    const inputField = container.find('input, textarea, select');
    if (inputField.length) {
      let emptyFound = false;
      inputField.each(function() {
        // Only validate if not disabled
        if (!$(this).prop('disabled') && !$(this).val().trim()) {
          $(this).addClass('is-invalid');
          emptyFound = true;
        } else {
          $(this).removeClass('is-invalid');
        }
      });
      
      if (emptyFound) {
        alert("Please fill in the required input details first!");
        return;
      }
    }

    // Also check if inside a form
    const parentForm = $(this).closest('form');
    if (parentForm.length) {
      let allValid = true;
      parentForm.find('input[required], select[required], textarea[required]').each(function() {
        if (!$(this).val()) {
          allValid = false;
          $(this).addClass('is-invalid');
        } else {
          $(this).removeClass('is-invalid');
        }
      });
      if (!allValid) {
        alert("Please fill in the required form fields first!");
        return;
      }
    }

    // Customize alert message contextually
    let actionMessage = "Action processed successfully! Redirecting...";
    const btnText = $(this).text().toLowerCase();
    if (btnText.includes('pdf') || btnText.includes('download')) {
      actionMessage = "Downloading document... Redirecting to secure document vault.";
    } else if (btnText.includes('approve')) {
      actionMessage = "Booking approved successfully! Redirecting to dashboard ledger.";
    } else if (btnText.includes('decline')) {
      actionMessage = "Booking declined. Redirecting to approvals queue.";
    } else if (btnText.includes('2fa')) {
      actionMessage = "SMS Two-Factor Authentication enabled successfully! Redirecting...";
    } else if ($(this).find('i.fa-paper-plane').length || btnText.includes('send')) {
      actionMessage = "Message sent successfully! Redirecting...";
    }
    
    alert(actionMessage);
    window.location.href = "404.html";
  });

  // 5. Intercept form submissions inside dashboards to validate and redirect to 404
  $('.dashboard-content-area').on('submit', 'form', function(e) {
    e.preventDefault();
    // Validate inputs
    let allValid = true;
    $(this).find('input[required], select[required], textarea[required]').each(function() {
      if (!$(this).val()) {
        allValid = false;
        $(this).addClass('is-invalid');
      } else {
        $(this).removeClass('is-invalid');
      }
    });

    if (allValid) {
      alert("Information saved/deployed successfully! Redirecting...");
      window.location.href = "404.html";
    }
  });

  // 6. Initialize Dashboard Charts
  initClientDashboardCharts();
  initAdminDashboardCharts();
});

/* Client Dashboard Charts (Chart.js) */
function initClientDashboardCharts() {
  try {
    // Loyalty Points Doughnut Chart
    const loyaltyCtx = document.getElementById('clientLoyaltyChart');
    if (loyaltyCtx) {
      new Chart(loyaltyCtx, {
        type: 'doughnut',
        data: {
          labels: ['Points Earned', 'Points Needed for Next Tier'],
          datasets: [{
            data: [7500, 2500],
            backgroundColor: ['#e07a5f', '#191920'],
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          cutout: '80%'
        }
      });
    }

    // Expense Breakdown Polar Area Chart
    const expenseCtx = document.getElementById('clientExpensesChart');
    if (expenseCtx) {
      new Chart(expenseCtx, {
        type: 'polarArea',
        data: {
          labels: ['Flights', 'Hotels', 'Dining', 'Tours', 'Transfers'],
          datasets: [{
            data: [12000, 8500, 4000, 9500, 2000],
            backgroundColor: [
              'rgba(224, 122, 95, 0.7)',
              'rgba(243, 156, 18, 0.7)',
              'rgba(52, 152, 219, 0.7)',
              'rgba(46, 204, 113, 0.7)',
              'rgba(155, 89, 182, 0.7)'
            ],
            borderColor: 'rgba(255, 255, 255, 0.08)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { display: false }
            }
          },
          plugins: {
            legend: { position: 'bottom', labels: { color: '#b0b0c5' } }
          }
        }
      });
    }
  } catch (e) {
    console.warn("Client Dashboard chart loading error: ", e);
  }
}

/* Admin Dashboard Charts (Chart.js) */
function initAdminDashboardCharts() {
  try {
    // 1. Sales & Revenue Line Chart
    const salesCtx = document.getElementById('adminSalesChart');
    if (salesCtx) {
      new Chart(salesCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue (₹ x 1000)',
              data: [120, 190, 150, 250, 220, 300, 450, 380, 310, 280, 350, 480],
              borderColor: '#e07a5f',
              backgroundColor: 'rgba(224, 122, 95, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Bookings (x10)',
              data: [80, 120, 110, 170, 150, 210, 320, 260, 200, 180, 230, 340],
              borderColor: '#f39c12',
              backgroundColor: 'rgba(243, 156, 18, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#b0b0c5' } },
            x: { grid: { display: false }, ticks: { color: '#b0b0c5' } }
          },
          plugins: {
            legend: { position: 'top', labels: { color: '#b0b0c5' } }
          }
        }
      });
    }

    // 2. Destinations Bar Chart
    const destCtx = document.getElementById('adminDestinationsChart');
    if (destCtx) {
      new Chart(destCtx, {
        type: 'bar',
        data: {
          labels: ['Goa', 'Kerala', 'Rajasthan', 'Agra', 'Manali', 'Shimla'],
          datasets: [{
            label: 'Popularity %',
            data: [42, 35, 30, 28, 22, 15],
            backgroundColor: '#f39c12',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#b0b0c5' } },
            x: { grid: { display: false }, ticks: { color: '#b0b0c5' } }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // 3. User Satisfaction Pie Chart
    const satCtx = document.getElementById('adminSatisfactionChart');
    if (satCtx) {
      new Chart(satCtx, {
        type: 'pie',
        data: {
          labels: ['5 Star', '4 Star', '3 Star', '2 Star or Less'],
          datasets: [{
            data: [75, 15, 7, 3],
            backgroundColor: ['#e07a5f', '#f39c12', '#3498db', '#6c757d'],
            borderColor: 'rgba(255, 255, 255, 0.08)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right', labels: { color: '#b0b0c5' } }
          }
        }
      });
    }
  } catch (e) {
    console.warn("Admin Dashboard chart loading error: ", e);
  }
}
