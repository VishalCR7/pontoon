var Pontoon = (function (my) {
  return $.extend(true, my, {
    requestItem: {
      /*
       * Toggle available projects/teams and request div
       *
       * show Show enabled projects/teams?
       */
      toggleItem: function (show, type) {
        // Toggle
        $('.controls .request-toggle')
          .toggleClass('back', !show)
          .find('span')
            .toggleClass('fa-chevron-right', show)
            .toggleClass('fa-chevron-left', !show);

        if (type === 'locale-projects') {
          var localeProjects = $('#server').data('locale-projects');

          // Hide all projects
          $('.items')
            .toggleClass('request', !show)
            .find('tbody tr')
              .toggleClass('limited', !show)
              .toggle(!show);

          // Show requested projects
          $(localeProjects).each(function() {
            $('.items')
                .find('td[data-slug="' + this + '"]')
              .parent()
                .toggleClass('limited', show)
                .toggle(show);
          });

          Pontoon.requestItem.toggleButton(!show, 'locale-projects');
        }
        else if (type === 'team') {
          // Hide all teams and the search bar
          $('.team-list').toggle(show);
          $('.search-wrapper').toggle(show);

          // Show team form
          $('#request-team-form').toggle(!show);
          Pontoon.requestItem.toggleButton(!show, 'team');
        }

        $('.controls input[type=search]:visible').trigger('input');
      },

      toggleButton: function (condition, type) {
        condition = condition || true;
        var show = condition

        if (type === 'locale-projects') {
          show = condition && $('.items td.enabled:visible').length > 0;
        }
        else if (type === 'team') {
          show = condition &&
          ($.trim($('#request-team-form #id_name').val()) !== '') &&
          ($.trim($('#request-team-form #id_code').val()) !== '');
        }

        $('#request-item-note').toggle(show);
        $('#request-item').toggle(show);
      },

      requestProjects: function(locale, projects, type) {
        $.ajax({
          url: '/' + locale + '/request/',
          type: 'POST',
          data: {
            csrfmiddlewaretoken: $('#server').data('csrf'),
            projects: projects,
          },
          success: function() {
            Pontoon.endLoader('New ' + type + ' request sent.', '', 5000);
          },
          error: function() {
            Pontoon.endLoader('Oops, something went wrong.', 'error');
          },
          complete: function() {
            $('.items td.check').removeClass('enabled');
            $('.items td.radio.fa-dot-circle').toggleClass('fa-circle fa-dot-circle enabled');
            Pontoon.requestItem.toggleItem(true, 'locale-projects');
            window.scrollTo(0, 0);
          }
        });
      },

      requestTeam: function(name, code) {
        $.ajax({
          url: '/request/team/',
          type: 'POST',
          data: {
            csrfmiddlewaretoken: $('#server').data('csrf'),
            name: name,
            code: code,
          },
          success: function() {
            Pontoon.endLoader('New team request sent.', '', 5000);
          },
          error: function(res) {
            if (res.status === 409) {
              Pontoon.endLoader(res.responseText, 'error');
            }
            else {
              Pontoon.endLoader('Oops, something went wrong.', 'error');
            }
          },
          complete: function() {
            $('#request-team-form #id_name').val('');
            $('#request-team-form #id_code').val('');
            Pontoon.requestItem.toggleButton(true, 'team');
            window.scrollTo(0, 0);
          }
        });
      }
    }
  });
}(Pontoon || {}));

$(function() {
  var container = $('#main .container');
  var type = $('#server').data('locale-projects') ? 'locale-projects' : 'team';

  // Switch between available projects/teams and projects/team to request
  container.on('click', '.controls .request-toggle', function (e) {
    e.stopPropagation();
    e.preventDefault();

    Pontoon.requestItem.toggleItem($(this).is('.back'), type);
  });

  // Select projects
  container.on('click', '.items td.check', function (e) {
    if ($('.controls .request-toggle').is('.back:visible')) {
      e.stopPropagation();

      $(this).toggleClass('enabled');
      Pontoon.requestItem.toggleButton(true, type='locale-projects');
    }
  });

  // Radio button hover behavior
  container.on({
    mouseenter: function () {
        $(this).toggleClass('far fa');
    },
    mouseleave: function () {
        $(this).toggleClass('far fa');
    }
  },'.items td.radio');

  // Select team
  container.on('click', '.items td.radio', function (e) {
    if ($('.controls .request-toggle').is('.back:visible')) {
      e.stopPropagation();

      $(this).add('.items td.radio.fa-dot-circle')
      .toggleClass('fa-circle fa-dot-circle enabled');

      Pontoon.requestItem.toggleButton(true, type='locale-projects');
    }
  });

  // Prevent openning project page from the request panel
  var menu = container.find('.project .menu');
  menu.find('a').click(function (e) {
    if (menu.find('.search-wrapper > a').is('.back:visible')) {
      e.preventDefault();
    }
  });

  // Enter team details
  container.on('change keyup click', '#request-team-form input[type=text]', function (e) {
    if ($('.controls .request-toggle').is('.back:visible')) {
      e.stopPropagation();
      Pontoon.requestItem.toggleButton(true, type='team');
    }
  });

  // Request projects/team
  container.on('click', '#request-item', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var locale = '';

    if ($(this).is('.confirmed')) {
      if (type === 'locale-projects' && $('body').hasClass('locale')) {
        var projects = $('.items td.check.enabled').map(function(val, element) {
          return $(element).siblings('.name').data('slug');
        }).get();
        locale = $('#server').data('locale') || Pontoon.getSelectedLocale();

        Pontoon.requestItem.requestProjects(locale, projects, 'projects');

        $(this)
          .removeClass('confirmed')
          .html('Request new projects');
      }

      else if (type === 'locale-projects' && $('body').hasClass('project')) {
        var project = $('#server').data('project');
        locale = $('.items td.radio.enabled').siblings('.name').data('slug');

        Pontoon.requestItem.requestProjects(locale, [project], 'team');

        $(this)
          .removeClass('confirmed')
          .html('Request new teams');
      }

      else if (type === 'team') {
        locale = $.trim($('#request-team-form #id_name').val());
        var code = $.trim($('#request-team-form #id_code').val());

        Pontoon.requestItem.requestTeam(locale, code);

        $(this)
          .removeClass('confirmed')
          .html('Request new team');
      }
    }
    else {
      $(this)
        .addClass('confirmed')
        .html('Are you sure?');
    }
  });
});
