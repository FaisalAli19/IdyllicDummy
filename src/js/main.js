/*global window*/
/*global $*/
/*global jQuery*/
/*global document*/
/*global swal*/

$(document).ready(function(){
  "use strict";
  $.fn.serializeObject = function (options) {
    options = jQuery.extend({}, options);

    var self = this,
        json = {},
        push_counters = {},
        patterns = {
          "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
          "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
          "push": /^$/,
          "fixed": /^\d+$/,
          "named": /^[a-zA-Z0-9_]+$/
        };


    this.build = function (base, key, value) {
      base[key] = value;
      return base;
    };

    this.push_counter = function (key) {
      if (push_counters[key] === undefined) {
        push_counters[key] = 0;
      }
      return push_counters[key]++;
    };

    jQuery.each(jQuery(this).serializeArray(), function () {

      // skip invalid keys
      if (!patterns.validate.test(this.name)) {
        return;
      }

      var k,
          keys = this.name.match(patterns.key),
          merge = this.value,
          reverse_key = this.name;

      while ((k = keys.pop()) !== undefined) {

        // adjust reverse_key
        reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

        // push
        if (k.match(patterns.push)) {
          merge = self.build([], self.push_counter(reverse_key), merge);
        }

        // fixed
        else if (k.match(patterns.fixed)) {
          merge = self.build([], k, merge);
        }

        // named
        else if (k.match(patterns.named)) {
          merge = self.build({}, k, merge);
        }
      }

      json = jQuery.extend(true, json, merge);
    });


    return json;
  };
});

Idyllic = function () {};
Idyllic.Helper = function (config) {
    this.config = config;
    this.audio_tag = new Audio();
};

Idyllic.Home = function (rootScope) {
    this.helper = rootScope.helper;
};

Idyllic.Creates = function (rootScope) {
    this.helper = rootScope.helper;
};

Idyllic.Careers = function (rootScope) {
    this.helper = rootScope.helper;
};

Idyllic.CareerDetail = function (rootScope) {
    this.helper = rootScope.helper;
};

Idyllic.CaseStudies = function (rootScope) {
    this.helper = rootScope.helper;
};

Idyllic.Studio = function (rootScope) {
    this.helper = rootScope.helper;
};

var _util = {
  prevArrow: '<button type="button" data-role="none" class="slick-prev-icon hidden-xs" aria-label="Previous" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 38"><defs><style>.brand-orange-fill-color{fill:#ee6321;}</style></defs><path d="M0 19a19 19 0 0 0 37.95 1.06h14.93a1 1 0 1 0 0-2H37.95A19 19 0 0 0 0 19zm2 0a17 17 0 0 1 33.95-.94H17.81L23 12.89a1.13 1.13 0 0 0-1.58-1.61l-7.14 6.91a1.05 1.05 0 0 0 0 1.53l7.14 6.92a1.14 1.14 0 0 0 .79.32 1.12 1.12 0 0 0 .79-.3 1.07 1.07 0 0 0 0-1.54l-5.24-5.06h18.19A17 17 0 0 1 2 19z" class="brand-orange-fill-color"/></svg></button>',
  nextArrow: '<button type="button" data-role="none" class="slick-next-icon hidden-xs" aria-label="Next" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 38"><defs><style>.brand-orange-fill-color{fill:#ee6321;}</style></defs><path d="M35 0a19 19 0 0 0-18.95 18H1.12a1 1 0 1 0 0 2h14.93A19 19 0 1 0 35 0zm0 36a17 17 0 0 1-16.95-16h18.14L31 25.11a1.11 1.11 0 0 0 0 1.57 1.14 1.14 0 0 0 1.58 0l7.14-6.92a1.05 1.05 0 0 0 0-1.52l-7.14-6.91a1.14 1.14 0 0 0-1.58 0 1.08 1.08 0 0 0 0 1.55L36.19 18H18.05A17 17 0 1 1 35 36z" class="brand-orange-fill-color"/></svg></button>',

  sendEventGA: function (eventCategory, eventAction, eventLabel) {
    if(window.ga){
      window.ga('send', {
        hitType: 'event',
        eventCategory: eventCategory || '',
        eventAction: eventAction || '',
        eventLabel: eventLabel || ''
      });
    }
  },

  sendExceptionGA: function (exDescription) {
    if(window.ga){
      window.ga('send', 'exception', {
        hitType: 'event',
        'exDescription': exDescription,
        'exFatal': false
      });
    }
  }
};

Idyllic.Helper.prototype = {
    initBasicSlick: function () {
      $('.slides').each(function () {
        var params = {
            dots: false,
            autoplay: false,
            draggable: false,
            swipe: false,
            arrows: false,
            prevArrow: _util.prevArrow,
            nextArrow: _util.nextArrow,
            speed: 1000//,
          // fade: true,
          // cssEase: 'linear'
        };
        $.extend(params, ($(this).data('slick') || {}));
        $(this).slick(params);
        //Custome Slider Click
        $(".project-section .slider-1").click(function() {
            $(".project-section .slider-2").removeClass("active");
            $(this).addClass("active");
            $(".project-section .fbg").addClass("hide-slider");
            $(".project-section .bbg").removeClass("hide-slider");
            $(".slides").slick('slickGoTo', parseInt('0'));
        });
        $(".project-section .slider-2").click(function() {
            $(".project-section .slider-1").removeClass("active");
            $(this).addClass("active");
            $(".project-section .bbg").addClass("hide-slider");
            $(".project-section .fbg").removeClass("hide-slider");
            $(".slides").slick('slickGoTo', parseInt('1'));
        });
      });
    },



    howWeDoItSlick: function () {
      $(".how-we-do-slides").slick({
        dots: true,
        arrows: false,
        nextArrow: '<button type="button" data-role="none" class="slick-next-icon" aria-label="Next" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 38"><defs><style>.brand-orange-fill-color{fill:#ee6321;}</style></defs><path d="M35 0a19 19 0 0 0-18.95 18H1.12a1 1 0 1 0 0 2h14.93A19 19 0 1 0 35 0zm0 36a17 17 0 0 1-16.95-16h18.14L31 25.11a1.11 1.11 0 0 0 0 1.57 1.14 1.14 0 0 0 1.58 0l7.14-6.92a1.05 1.05 0 0 0 0-1.52l-7.14-6.91a1.14 1.14 0 0 0-1.58 0 1.08 1.08 0 0 0 0 1.55L36.19 18H18.05A17 17 0 1 1 35 36z" class="brand-orange-fill-color"/></svg></button>',
        speed: 1000
      });

      $(".how-we-do-it-section .nav-links li a").click(function () {
          _util.sendEventGA('How we do it', 'Click', 'How we do it Blue Screen click');
          $(".how-we-do-slides").slick('slickGoTo', $(this).data('index'));
      });

      $('.how-we-do-slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var el = $(this),
            mainContainer = el.closest(".how-we-do-it-section"),
            navLinksContainer = mainContainer.find(".nav-links-container"),
            activeLi = navLinksContainer.find(".active"),
            allLi = navLinksContainer.find("li");

        activeLi.removeClass('active');
        allLi.eq(nextSlide).addClass('active');
      });
    },

    teamImageSliderSlick: function () {
      $(".team-image-slider").slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinite: true,
        slidesToShow: 5,
        centerMode: true,
        variableWidth: true,
        asNavFor: '.team-name-slider'
      });

      $('.team-name-slider').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        asNavFor: '.team-image-slider',
        prevArrow: _util.prevArrow,
        nextArrow: _util.nextArrow,
        fade: true
      });
    },

    coreTeamImageSliderSlick: function () {
      $(".core_team-image-slider").slick({
        arrows: false,
        slidesToShow: 3,
        focusOnSelect: true,
        asNavFor: '.core_team-name-slider'
      });

      $('.core_team-name-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        asNavFor: '.core_team-image-slider',
        fade: true
      });
    },

    initTwoSliderSlick: function () {
      $('.slides-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: true,
        asNavFor: '.slides-nav'
      });

      $('.slides-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slides-for',
        centerMode: true,
        focusOnSelect: true
      });
    },

    randomIndex: function(len){
      return Math.floor(Math.random() * len);
    },

    get_random: function(data, count){
      var self = this;
      if(count && count >= 1) {
        var arr = [],
            len = data.length,
            indexHash = {};
        if(count >= len){
          return data;
        }
        while(1){
          var index = self.randomIndex(len);
          if(arr.length == count){
            break;
          }
          if(!indexHash.hasOwnProperty(index) && index < len){
            indexHash[index] = true;
            arr.push(data[index]);
          }
        }
        return arr;
      }else {
        return data[self.randomIndex(data.length)] || data[0];
      }
    },

    videoInit: function () {
      /* Play video in a modal window */
      var myContent = $('.modal_content'),
          player,
          triggerButtons = $('.modal_trigger, .btn_watch_video'),
          closeButton = $('.modal_head a'),
          vimeoId,
          modal_overlay = $('.modal_overlay');

      function hideModal(evt){
        evt.preventDefault();
        $('body').removeClass('modal_opened');
        modal_overlay.removeClass('active');
        _util.sendEventGA('Video Modal', 'Click', 'Video Model Closed');
        var tmp = $('<div class="iframe_container"></div>');
        myContent
            .removeClass('modal_open')
            .find('.iframe_container')[0].replaceWith(tmp[0]);
        try {
          player.pauseVideo();
        }catch(e){}
        player = null;
      }

      modal_overlay.click(hideModal);
      $(closeButton).click(hideModal);

      function loadVimeoVideo (vimeoId) {
        var el,
            popupEl = $("#video_modal_content"),
            data;
        $('.thumbnail-section.active').removeClass('active');
        player.loadVideo(vimeoId).then(function(id) {
          player.play().catch();
          el = $('.thumbnail-section[data-video-id="'+id+'"]');
          data = el.data();
          el.addClass('active');
          _util.sendEventGA('Vimeo Video Played', 'Click', data.vimeo_title);
          // popupEl.find('.vimeo_title').html(data.vimeo_title);
          // popupEl.find('.vimeo_description').html(data.vimeo_description);
        });
      }

      $('#video_modal_content .thumbnail-section').click(function () {
          vimeoId = $(this).data('videoId');
          loadVimeoVideo(vimeoId);
      });

      triggerButtons.click(function(e) {
        e.preventDefault();
        var el = $(this),
            data = el.data(),
            modelEl = $(data.modal_id),
            container = modelEl.find('.iframe_container')[0];
        _util.sendEventGA('Video Modal', 'Click', data.videoFor + " Model Open");
        $('body').addClass('modal_opened');
        modal_overlay.addClass('active');
        modelEl.addClass('modal_open');
        if(data.video_type == 'youtube') {
          player = new YT.Player(container, {
            videoId: data.video,
            playerVars: {'autoplay': 1, 'controls': 0},
            events: {
              'onReady': function (event) {
                _util.sendEventGA('Video Played', 'Click', data.videoFor);
              }
            }
          });
        }else if(data.video_type == 'vimeo'){
          player = new Vimeo.Player(container, {
            id: data.video,
            loop: false,
            title: false,
            autoplay: true
          });
        }
        else if(data.video_type == 'vimeo_album'){
          modelEl.find('.slides').slick('slickGoTo', 0);
          vimeoId = modelEl.find('.thumbnail-section').not('.slick-cloned').eq(0).data('videoId');
          player = new Vimeo.Player(container, {
            id: vimeoId,
            loop: false,
            title: false
          });
          player.getEnded().then(function(ended) {
          }).catch(function(error) {
          });
          player.on('ended', function () {
              try{
                var nextEl = $('.thumbnail-section[data-video-id="'+vimeoId+'"]').not('.slick-cloned').next(),
                    nextIndex = nextEl.data('index');
                modelEl.find('.slides').slick('slickGoTo', nextIndex);
                vimeoId = nextEl.data('videoId');
                loadVimeoVideo(vimeoId);
              }catch(e){}
          });
          loadVimeoVideo(vimeoId);
        }
      });
    },

    loadImage: function (url) {
        var a = new Image();
        a.src = url;
    },

    playAudio: function (src, volume) {
        this.audio_tag.pause();
        this.audio_tag.src = src;
        if(volume) {
          this.audio_tag.volume = volume;
        }
        return this.audio_tag.play().catch();
    },

    processData: function (data) {
        var details = '',
            tags = data.tags;
        if(data.hasOwnProperty('tags')){
          details += "Looking for";
          if(tags.hasOwnProperty('product_tags')){
            details += ' PRODUCT: ' + tags.product_tags.join(", ") + '.';
          }
          if(tags.hasOwnProperty('design_tags')){
            details += ' DESIGN: ' + tags.design_tags.join(", ") + '.';
          }
          if(tags.hasOwnProperty('development_tags')){
            details += ' DEVELOPMENT: ' + tags.development_tags.join(", ") + '.';
          }
          if(tags.hasOwnProperty('budget_tags')){
            details += ' BUDGET: ' + tags.budget_tags.join(", ") + '.';
          }
        }else {
          details = "Looking for other details";
        }
        data.details = details;
        delete data.tags;
        return data;
    },

    addAjaxLoader: function(scope){
      var loader = '<span class="ajax-loader"></span>';
      if(scope.find('.ajax-loader')){
        scope.find('.ajax-loader').remove();
      }
      scope.addClass('loaderIn');
      scope.append(loader);
      scope.attr('disabled', 'disabled');
    },

    removeAjaxLoader: function(scope){
      scope.removeClass('loaderIn');
      scope.find('.ajax-loader').remove();
      scope.removeAttr('disabled');
    },

    submitData: function (url, jFrom, data, cb, extraParams) {
      var self = this,
          config = self.config,
          params,
          btn = jFrom.find('button[type="submit"]');
      self.addAjaxLoader(btn);

      params = {
        url: config.baseUrl + url,
        headers: {
          'Authorization': 'Token token=' + config.apiKey
        },
        method: 'POST',
        cache: false,
        dataType: 'json',
        data: data,
        success: function (res) {
          self.removeAjaxLoader(btn);
          if(res.success) {
            jFrom[0].reset();
          }
          if(cb) {
            cb(res);
          }
        },
        error: function () {
          self.removeAjaxLoader(btn);
          _util.sendExceptionGA("Server Error for "+ url);
          swal({title: "Oops!",   text: "Something went wrong. Please try later.",   type: "error",   confirmButtonText: "OK" });
        }
      };
      $.extend(params, extraParams || {});
      $.ajax(params);
    }
};

Idyllic.prototype = {
  init: function (config) {
    var self = this;
    self.helper = new Idyllic.Helper(config);
    self.helper.initBasicSlick();
    self.initEventListeners(config);

    switch (config.page_type){
      case "home":
        self.home = new Idyllic.Home(self);
        self.home.init();
        break;

      case "creates":
        self.creates = new Idyllic.Creates(self);
        self.creates.init();
        break;

      case "case_studies":
        self.caseStudies = new Idyllic.CaseStudies(self);
        self.caseStudies.init();
        break;

      case "studio":
        self.studio = new Idyllic.Studio(self);
        self.studio.init();
        break;

      case "careers":
        self.careers = new Idyllic.Careers(self);
        self.careers.init();
        break;

      case "career_detail":
        self.careerDetail = new Idyllic.CareerDetail(self);
        self.careerDetail.init();
        break;
    }

  },

  initEventListeners: function (config) {
    var self = this,
        is_home = config.page_type == "home",
        is_studio = config.page_type == "studio";

    if(is_home) {
      var videoEl = $("#bg-video");
      if (videoEl.length) {
          videoEl[0].play().catch();
      }
    }

    $(document).on('change', ".date_section input[type='radio']", function () {
      var index = $(this).parent().index(),
          el = $("#choose_another_time_field_set fieldset").eq(index);

      $("#choose_another_time_field_set fieldset").addClass('hidden').attr('disabled', 'disabled');
      el.removeClass('hidden').removeAttr('disabled');
      el.find("input[type='radio']")[0].checked = true;
    });

    $(document).on('change', ".choose_tomorrow_time input[type='radio']", function () {
      $("#choose_another_time_field_set").addClass('hidden').attr('disabled', 'disabled');
    });

    $(document).on('click', ".choose_another_time", function () {
      var el = $(".date_section input[type='radio']");
      $("#choose_another_time_field_set").removeClass('hidden').removeAttr('disabled');
      $("fieldset input[type='radio']").removeAttr('checked');
      el.eq(0)[0].checked = true;
      el.eq(0).trigger('change');
    });

    $('.menu-popup-icon .menu-icon-btn').on('click', function (e) {
      e.preventDefault();
      _util.sendEventGA('Menu', 'Click', 'Menu Button Opened');
      $('.menu-section-wrap').removeClass('hidden').show();
      $("body").addClass('menu-open');
      $('.close').on('click', function () {
        $('.menu-section-wrap').addClass('hidden').hide();
        $("body").removeClass('menu-open');
      });
    });

    $(".video_email_form").submit(function (e) {
      e.preventDefault();
      var jFrom = $(this),
          data = jFrom.serializeObject();

      _util.sendEventGA('Video Link', 'Click', 'Video Link Ajax request');
      self.helper.submitData('api/v1/intro_video', jFrom, data, function (res) {
        jFrom[0].reset();
        swal({
          title: "Stay Tuned",
          text: "You will shortly receive video link email",
          timer: 3000,
          type: 'success',
          showConfirmButton: false
        });
      });
    });

    $(".fact_book_form").submit(function (e) {
      e.preventDefault();
      var jFrom = $(this),
          data = jFrom.serializeObject();

      _util.sendEventGA('Fact Book', 'Click', 'Fact book Ajax request');
      self.helper.submitData('api/v1/downloads.json', jFrom, data, function (res) {
        jFrom[0].reset();
        swal({
          title: "Stay Tuned",
          text: "You will shortly receive download link email",
          timer: 3000,
          type: 'success',
          showConfirmButton: false
        });
      });
    });

    $(window).scroll(function() {
      var top = this.pageYOffset,
          width = $(window).width(),
          endPoint = ($("[data-hide-menu-section]").height() + $("[data-hide-menu-section]").offset().top - 150);
          endPoint = endPoint < 50 ? 0 : endPoint;
      if (top > endPoint) {
        if (is_studio && width >= 768) {
          $('.header-section-wrap .page-heading p').addClass('hideText').removeClass('showText');
          $('.header-section-wrap .mobile-submenu').addClass('hideText').removeClass('showText');
          $('.header-section-wrap .page-heading').addClass('scrollHeading');
        }
        else {
          $('.header-section-wrap .mobile-submenu').addClass('hideText').removeClass('showText');
          $('.header-section-wrap .page-heading').addClass('hideText').removeClass('showText');
          $('.header-section-wrap .menu-popup-icon').addClass('fixedPosition').removeClass('staticPosition');
        }
      } else {
        $('.header-section-wrap .page-heading').removeClass('scrollHeading').removeClass('hideText').addClass('showText');
        $('.header-section-wrap .page-heading p').removeClass('hideText').addClass('showText');
        $('.header-section-wrap .mobile-submenu').removeClass('hideText').addClass('showText');
        $('.header-section-wrap .menu-popup-icon').removeClass('fixedPosition').addClass('staticPosition');
        $('.header-section-wrap').addClass('fixedPosition');
      }

      if(is_home){
          var viewPortHeight =  $(".main-viewport-section").height(),
              videoEl = $("#bg-video"),
              videoOutViewportMax = $(".we-specialize-section").offset().top + 300;
        if(videoEl.length) {
          if (top > videoOutViewportMax) {
            videoEl[0].pause();
          } else {
            videoEl[0].play().catch();
          }
        }
        if(top > ($(".project-section-wrap.brig_bg").offset().top - 120)){
          $(".project-section-wrap.brig_bg").addClass('in_viewport_section');
        }
        if(top > ($(".project-section-wrap.fankave_bg").offset().top - 80)){
          $(".project-section-wrap.fankave_bg").addClass('in_viewport_section');
        }
        if(top > viewPortHeight) {
          width = $(window).width();
          if (width >= 768) {
              $(".phontom-div").height(viewPortHeight);
              $("body").removeClass("overlayIn");
              $(".we-specialize-section").addClass("scrollIn");
          }
          else {
            $(".phontom-div").height(0);
            $("body").removeClass("overlayIn");
            $(".we-specialize-section").addClass("scrollIn");
          }
        }else {
          $("body").addClass("overlayIn");
          $(".phontom-div").height(top);
            $(".we-specialize-section").removeClass("scrollIn");
        }
      }
    });


    $("#contact_from").submit(function (e) {
      e.preventDefault();
      var jFrom = $(this),
          data = self.helper.processData(jFrom.serializeObject());
          data['g-recaptcha-response'] = $("#g-recaptcha-response").val();

      _util.sendEventGA('Contact Form', 'Click', 'Contact form Ajax request');
        self.helper.submitData('api/v1/inquiries.json', jFrom, data, function (res) {
          if(res.success){
            swal({
              title: "Stay Tuned",
              text: "Idyllic team will contact you.",
              timer: 3000,
              type: 'success',
              showConfirmButton: false
            });
          }else {
            if(res.errors){
              try {
                swal({title: "Oops!",   text: res.errors.join(", "),   type: "error",   confirmButtonText: "OK" });
              }catch(e){
                swal({title: "Oops!",   text: "Something went wrong. Please try later.",   type: "error",   confirmButtonText: "OK" });
              }
            }
          }
        });
    });


    $("footer .idyllic-locations img").hover(
        function () {
          var width = $(window).width();
          if (width >= 768) {
            _util.sendEventGA('Footer team Image', 'Hover', 'Footer Team Image Hover');
            self.helper.playAudio('/audio/' + $(this).closest('.idyllic-locations').data('soundType') + '.mp3', 0.4);
          }
        }, function () {
          self.helper.audio_tag.pause();
        }
    );


    $('.scroll_to').on('click', function () {
        var cls = $(this).data('whereToScroll'),
            el =  $(cls);
        _util.sendEventGA('Scroll To', 'Click', 'Scroll to Bounce button click');
        $("html,body").animate({scrollTop: el.offset().top}, 400);
    });

  }
};

Idyllic.Home.prototype = {
  init: function () {
    var self = this,
        helper = self.helper;

    helper.videoInit();
    $("body").addClass("overlayIn");

    $("#give_me_more").click(function () {
        _util.sendEventGA('Scroll To', 'Click', 'Scroll to Bounce button click');
        $("html,body").animate({scrollTop: $(".main-page-top-section").outerHeight() + 50}, 400);
    });
  }
};

Idyllic.CaseStudies.prototype = {
  init: function () {
      var self = this;
      self.initFankave();
  },

  initFankave: function(){
    var self = this,
        helper = self.helper;

    $(".slide-fankave").slick({
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      prevArrow: '<button type="button" data-role="none" class="slick-prev-icon hidden-xs" aria-label="Previous" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 38"><defs><style>.brand-orange-fill-color{fill:#ee6321;}</style></defs><path d="M0 19a19 19 0 0 0 37.95 1.06h14.93a1 1 0 1 0 0-2H37.95A19 19 0 0 0 0 19zm2 0a17 17 0 0 1 33.95-.94H17.81L23 12.89a1.13 1.13 0 0 0-1.58-1.61l-7.14 6.91a1.05 1.05 0 0 0 0 1.53l7.14 6.92a1.14 1.14 0 0 0 .79.32 1.12 1.12 0 0 0 .79-.3 1.07 1.07 0 0 0 0-1.54l-5.24-5.06h18.19A17 17 0 0 1 2 19z" class="brand-orange-fill-color"/></svg></button>',
      nextArrow: '<button type="button" data-role="none" class="slick-next-icon hidden-xs" aria-label="Next" tabindex="0" role="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 38"><defs><style>.brand-orange-fill-color{fill:#ee6321;}</style></defs><path d="M35 0a19 19 0 0 0-18.95 18H1.12a1 1 0 1 0 0 2h14.93A19 19 0 1 0 35 0zm0 36a17 17 0 0 1-16.95-16h18.14L31 25.11a1.11 1.11 0 0 0 0 1.57 1.14 1.14 0 0 0 1.58 0l7.14-6.92a1.05 1.05 0 0 0 0-1.52l-7.14-6.91a1.14 1.14 0 0 0-1.58 0 1.08 1.08 0 0 0 0 1.55L36.19 18H18.05A17 17 0 1 1 35 36z" class="brand-orange-fill-color"/></svg></button>',
      // fade: true,
      // cssEase: 'linear'
    });
    $('.ideation-section-wrap .slides .slides-items').each(function(){ helper.loadImage( $(this).data('url') );});
    $('.ideation-section-wrap .slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var el = $(slick.$slides[nextSlide]);
      $('.ideation-section-wrap .ideation-wrap-up-img img').attr('src', el.data('url'));
    });

  }
};

Idyllic.Studio.prototype = {
  init: function () {
    var self = this,
        helper = self.helper;

    helper.howWeDoItSlick();
    helper.teamImageSliderSlick();
    helper.coreTeamImageSliderSlick();
    helper.videoInit();
    self.initEventListeners();
  },

  initEventListeners: function () {
      var facts = [],
          fact, index,
          self = this,
          afterLastSection = function () {
            $('.embarrassing-facts-section').addClass('last-section-visible');
            $('.btn_refresh_section').hide();
            $('.btn_smile_section').show();
            _util.sendEventGA('About Us', 'Click', 'About Us Last Fact Download more visible');
          },
          aboutUsSoundLoad = function () {
              index = $(".fact_slide_item.slick-active").data('index');
              if(index != -1){
                $(".fact_slides").slick('slickGoTo', index + 1);
                _util.sendEventGA('About Us', 'Click', 'Show more fact on about us');
              }else {
                  afterLastSection();
              }
          },
          afterSoundLoad = function (fact) {
              _util.sendEventGA('Embarrassing Fact', 'Click', 'Show more embarrassing fact');
              $(".random_facts_text").html(fact.text);
              $(".random_facts_sub_text").html(fact.sub_text);
          },
          helper = self.helper;

    $(".mobile-submenu").scrollLeft($(".mobile-submenu .active-page").offset().left);

    $(".fact_slides").on('afterChange', function(event, slick, currentSlide){
      var els = $(this).find('.fact_slide_item');
      if(els.eq(currentSlide).data('index') == -1){
          afterLastSection();
      }
    });


      if(sessionStorage.facts){
          facts = JSON.parse(sessionStorage.facts);
      }else {
        _util.sendEventGA('Get Fact Ajax', 'Click', 'Get Fact Data from Ajax');
        $.ajax({
          url: '/facts',
          method: 'GET',
          success: function (res) {
            if(res.success) {
              sessionStorage.setItem('facts', JSON.stringify(res.facts));
              facts = res.facts;
            }
          }
        });
      }

      $('.fact_slides').slick({
          autoplay: false,
          arrows: false,
          fade: true
      });

      $(".refresh_facts_btn").on('click', function () {
        var type = $(this).data('type'), playPromise,
            width = $(window).width(),
            index;
        if(type == 'about_us'){
            playPromise = helper.playAudio("/audio/page_flip.mp3");
            if (playPromise !== undefined) {
              playPromise.then(function() {
                  aboutUsSoundLoad();
              });
            } else {
                aboutUsSoundLoad();
            }
          } else {
                fact = self.helper.get_random(facts[type] || []);
            if (fact) {
              if(width >= 768){
                playPromise = helper.playAudio("/audio/refresh.mp3");
                if (playPromise !== undefined) {
                  playPromise.then(function () {
                      afterSoundLoad(fact);
                  });
                }else {
                    afterSoundLoad(fact);
                }
              }else {
                afterSoundLoad(fact);
              }
            }
        }
      });
  }
};

Idyllic.Creates.prototype = {
    init: function () {
      var self = this,
          helper = self.helper,
          slickNavEl = $('.creates-viewport-section .slides-nav'),
          slickForEl = $('.creates-viewport-section .slides-for');

      helper.initTwoSliderSlick();

      slickForEl.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var els = $(this).find('.slides-items');

            $('.creates-viewport-section')
                .removeClass(els.eq(currentSlide).data('cls'))
                .addClass(els.eq(nextSlide).data('cls'));
      });

        slickNavEl.find('.slides-items').hover(
            function() {
              _util.sendEventGA('Create Case Study', 'Hover', 'Creates Page Case Study Mouse Hover');
              slickForEl.slick('slickGoTo', $(this).data('index'));
              slickForEl.slick('slickPause');
            }, function() {
              slickForEl.slick('slickPlay');
            }
        );

      $("#where_to_begin_form").submit(function (e) {
        e.preventDefault();
        var jFrom = $(this),
            data = helper.processData(jFrom.serializeObject());

        data.name = "Only Email inquiries from Create Page";
        data.location = "NA";
        data.phone_number = "NA";

        _util.sendEventGA('Creates Inquiries', 'Click', 'Creates Inquiries Form Submit');
        self.helper.submitData('api/v1/inquiries/email_inquiry.json', jFrom, data, function (res) {
          if(res.success){
            swal({
              title: "Stay Tuned",
              text: "Idyllic team will contact you.",
              timer: 3000,
              type: 'success',
              showConfirmButton: false
            });
          }else {
              if(res.errors){
                  try {
                    swal({title: "Oops!",   text: res.errors.join(", "),   type: "error",   confirmButtonText: "OK" });
                  }catch(e){
                    swal({title: "Oops!",   text: "Something went wrong. Please try later.",   type: "error",   confirmButtonText: "OK" });
                  }
              }
          }
        });

      });
    }
};

Idyllic.Careers.prototype = {
  init: function () {
    var self = this,
        helper = this.helper;
    $('.work_at_idyllic_section .slides .slides-items').each(function(){ helper.loadImage( $(this).data('url') ); });

    $('.work_at_idyllic_section .slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var el = $(slick.$slides[nextSlide]);
        $('.work_at_idyllic_section').css('background-image', 'url('+el.data('url')+')');
    });
  }
};


Idyllic.CareerDetail.prototype = {
  init: function () {
    var self = this;

    $("#career_detail_form").submit(function (e) {
      e.preventDefault();
      var jFrom = $(this),
          data = new FormData(jFrom[0]);

      _util.sendEventGA('Job Application', 'Click', 'Job Application Form Submit');
      self.helper.submitData('api/v1/job_applications.json', jFrom, data, function (res) {
        if(res.success){
          swal({
            title: "Stay Tuned",
            text: "Idyllic team will contact you.",
            timer: 3000,
            type: 'success',
            showConfirmButton: false
          });
        }else {
          if(res.errors){
            try {
              swal({title: "Oops!",   text: res.errors.join(", "),   type: "error",   confirmButtonText: "OK" });
            }catch(e){
              swal({title: "Oops!",   text: "Something went wrong. Please try later.",   type: "error",   confirmButtonText: "OK" });
            }
          }
        }
      }, {
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false
      });
    });
  }
};

//We Learn Section Slider
var learn = {
    slider: function() {
        $(".we-learn-slides").slick({
            dots: false,
            speed: 500,
            slidesToShow: 1,
            arrows: false,
            draggable: false
        });
        $(".We-learn-section .slider-1").click(function() {
            $(this).addClass("active");
            $(".We-learn-section .slider-2").removeClass("active");
            $(".we-learn-slides").slick("slickGoTo", parseInt("0"));
        });
        $(".We-learn-section .slider-2").click(function() {
            $(this).addClass("active");
            $(".We-learn-section .slider-1").removeClass("active");
            $(".we-learn-slides").slick("slickGoTo", parseInt("1"));
        });
    }
};

$(document).ready(function() {
    learn.slider();
});

//res-slider
var res = {
    res: function() {
        $(".res-slides").slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: "unslick"
                },
                {
                    breakpoint: 1920,
                    settings: "unslick"
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
        $(".res-slider .left-arrow").click(function() {
            $(".res-slides").slick('slickPrev');
        });
        $(".res-slider .right-arrow").click(function() {
            $(".res-slides").slick('slickNext');
        });
    }
};

// Calling the res slider function
$(document).ready(function() {
    res.res();
});

//Clients slider
var clients = {
    slider: function() {
        $(".clients-slides").slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: "unslick"
                },
                {
                    breakpoint: 1920,
                    settings: "unslick"
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        variableWidth: true
                    }
                }
            ]
        });
        $(".clients-slider .left-arrow").click(function() {
            $(".clients-slides").slick('slickPrev');
        });
        $(".clients-slider .right-arrow").click(function() {
            $(".clients-slides").slick('slickNext');
        });
    }
};

// Calling the res slider function
$(document).ready(function() {
    clients.slider();
});

// //Scroll to contact page
// $(function() {
//     console.log();
//     var $root = $('html, body');
//
//     $("#contact-us").click(function(e) {
//         var linkId = $(this).attr("href");
//
//         if (window.location.pathname === "/") {
//             $root.animate({
//                 scrollTop: $(linkId).offset().top + 500
//             }, 500);
//         } else {
//             $root.animate({
//                 scrollTop: $(linkId).offset().top
//             }, 1000);
//         }
//         return false;
//
//     });
// });


$(function() {
    if($(window).width("<768px")){
        $(".nav-list, .social-contact").hide();
    }

    $(".menu-icon").click(function() {
        $(".nav-list, .social-contact").slideToggle();
    });
});
