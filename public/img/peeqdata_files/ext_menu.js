var eva_master_url = "https://eclips.io"

try{Typekit.load();}catch(e){}
(function(d) {
  var tkTimeout=3000;
  if(window.sessionStorage){if(sessionStorage.getItem('useTypekit')==='false'){tkTimeout=0;}}
  var config = {
    kitId: 'rjl1wnf',
    scriptTimeout: tkTimeout
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+"wf-inactive";if(window.sessionStorage){sessionStorage.setItem("useTypekit","false")}},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+="wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

$(document).ready(function () {
  /*
  GLOBAL VARIABLES
  */
  // keeps track of video_obj's
  var videos = {};
  // keep data of video_obj
  var video_obj_save;
  // keeps track of the current user's bookmarked videos
  var bookmarked_videos = [];
  var context = '';
  var chirps;
  // toggled based on whether a user wants to see all the videos in the extension menu or just 3
  var showed_all = false;

  var video_data;
  // var $add_title_menu = $('#add_title_menu');
  var $profile_info = $('#profile_info');
  var $video_wrapper = $('#video_wrapper');
  var $default_view = $('.eva_default_view');
  var $show_more = $('#show_more');
  var video_in_view;
  var orderIDs;
  var countDown;

  /*
  HTML
  */
  // save/clip buttons in the menu.
  var save_and_clip_wrapper_html = "<div class='btn_wrapper'>" +
                                    "<div class='menu_icon clip_btn'>" +
                                      "<span class='menu_btn_text'>Clip</span>" +
                                    "</div>" +
                                    "<div class='menu_icon save_btn'>" +
                                    "</div>" +
                                  "</div>";
  // save button when a video is not bookmarked.
  var save_btn_html = "<span class='menu_btn_text'>Save</span>";
  // save button when a video is bookmarked
  var bookmarked_btn_html = "<span class='menu_btn_text'>Saved</span>";
  // spinner during the bookmarking process
  var small_spinner_html = "<div class='small progress'></div>";

  // video title in the video_wrapper
  var video_title_html = function video_title_html (video_obj) {
    return "<span class='menu_text'>" +
            format_menu_text(video_obj) +
          "</span>";
  }
  // video img in the video_wrapper
  var video_img_html = function video_img_html (img) {
    return "<img src=" + img + " />";
  }
  // link to view a bookmarked video
  var bookmark_link_html = function bookmark_link_html () {
    return "<div class='bookmark_link_wrapper'>" +
              "<a target=\"_blank\"" +
                " class=\"bookmark_link no_link\">" +
              "Watch on Eclips" +
              "</a>" +
            "</div>";
  }
  // wrappper for each video in the menu
  var video_wrapper_div_html = function video_wrapper_div_html (vid_obj) {
    return "<div class='component-item menu_video eva_" + vid_obj.vid_ref.id + "'>" +
              video_img_html(vid_obj.thumbnail_url) +
              video_title_html(vid_obj) //+
              // bookmark_link_html() +
              // save_and_clip_wrapper_html +
            "</div>";
  }

  /*
  UTILITY FUNCTIONS
  */
  // resets the videos displayed in the menu and the array that tracks them.
  var reset_video_wrapper = function reset_video_wrapper() {
    videos = {};
    $video_wrapper.empty();
  }
  // formats the text in the menu to fit in the menu
  var format_menu_text = function format_menu_text(e) {
    var text = "";
    if (e.title && e.title.length > 40) {
      text = e.title.substring(0, 40) + "..."
    } else {
      text = e.title || e.vid_ref.author || "";
    }
    return text;
  };

  var authenticateuser = function(payload) {
    void 0;
    void 0;
    var u = localStorage.getItem('user');
    // console.log(u);
    if (!u || u._id == '56cf564d0ea37fb5349a0b4c') {
      void 0;
      w = window.open(eva_master_url+'/um/sign_in.html', 'eva-login', 'height=590, width=430');
      var winterval = setInterval(function() {
        if(w && w.closed) {
          getUser();
          void 0;
          parent.postMessage({
            eva_msg: "update_tabs_auth"
          }, "*");
          clearInterval(winterval);
        };
      }, 200);
    } else {
      parent.postMessage({ 
        eva_msg: 'authenticate_user', 
        verified : true,
        vendor : payload.vendor,
        fn: payload.fn,
        video_obj: payload.video_obj  }
      , '*');
    }
  };

  /*
  CORE FUNCTIONS
  */
  // Call this anytime you need to check if the user is logged in
  var getUser = function getUser() {
    void 0;
    // $profile_info.show()

    // AJAX call to get the user
    eva_ajax('/api/user/get/profile', 'POST').then(function(data){
      void 0;
      var user = data[0];
      // if the user is logged in
      if(user && user._id && user._id !== '56cf564d0ea37fb5349a0b4c') {
        void 0;
        var local = user.profile.local;
        var displayName = local.displayName;
        var photo = local.photo.small;
        // $("#notifications").show();
        $profile_info._sid = user._sid;
        $profile_info._id = user._id;
        $profile_info.html('<div class="eva-profile-button"><img src="' + photo + '"><p>Go To Profile</p></div>');
        $profile_info.click(function () {
          var url = eva_master_url + '/u/' + $profile_info._id + '/timeline';
          parent.postMessage({ eva_msg: "go_profile", url: url }, '*');
        });

        // set the user in the menu's localStorage. 
        // NOTE: This is not the current website localStorage but the eclips local storage because the menu gets served through eclips. 
        // Any AJAX calls requiring user info must be done here rather than in a content script.
        localStorage.setItem('user', JSON.stringify(user));

        // Remove log-in stuff
        $("#profile-login").remove();
        $default_view.show();

        // 09/08/16
        // $("#no_video").show();
        // console.log('auth: [getUser] postMessage "startin script"');

        // // Send message to inject to begin scraping
        // 09/27/16: moved to bottom: start script indescriminantly
        // parent.postMessage({
        //   eva_msg: "start_scripts"
        // }, "*");

        // Send notification toggle state to vendors
        // var checked = ('true' === localStorage.getItem('checked') || !localStorage.getItem('checked'));
        // $('#toggle_notifications')[0].checked = checked;

        // 09/10/2016
        // setTimeout(function () {
        //   parent.postMessage({
        //     eva_msg: "send_notification_state",
        //     toggle: checked
        //   }, "*");
        // }, 500);
        void 0;
        // Get the user's bookmarked videos
        eva_ajax('/api/chirp/bookmarked/user').then(function (data) {
          bookmarked_videos = data;
          // Updates the vendor's bookmarked videos list
          void 0;
          parent.postMessage({
            eva_msg: "update_bookmarked_list",
            bookmarked_list: data
          }, "*");
        });
      // if the user is not logged in
      } else {
        void 0;
        localStorage.setItem('user', '');

        $video_wrapper.hide();
        $default_view.hide();
        $('#no_video').hide();
        $('#venvy-spinner').hide();
        reset_video_wrapper();

        // 09/25/2016
        // $add_title_menu.hide();
        // console.log('stopping script');
        // parent.postMessage({
        //   eva_msg: "stop_scripts"
        // }, "*");

        $("#profile-login-button").on("click", function(){
            w = window.open(eva_master_url+'/um/sign_in.html', 'eva-login', 'height=590, width=430');
            // w = window.open(eva_master_url, 'eva-login', 'height=590, width=430');
            // w = window.open('https://google.com', 'eva-login', 'height=590, width=430');
            // $("#profile-login").text("Loading...");
            var windowInterval = setInterval(function() {
              if(w && w.closed){
                getUser();
                void 0;
                parent.postMessage({
                  eva_msg: "update_tabs_auth"
                }, "*");
                clearInterval(windowInterval);
              }
            }, 200);
          });
        // exit_menu_handler();
      }
    });
  }
  // Sets the state of the save button as "saved" or "unsaved" by passing in the button and the result of the is_video_bookmarked function
  var set_save_btn_state = function set_save_btn_state(save_btn, bookmarked_video, id) {
    void 0;
    if (bookmarked_video) $('.vid' + id).html('Unsave');
    else $('.vid' + id).html('Save');
  }
  // Renders the link to the website for a bookmarked video. Pass in the video_wrapper and the result of is_video_bookmarked
  var render_bookmark_link = function render_bookmark_link (vid_wrapper, bookmarked_video) {
    void 0;
    if(bookmarked_video) {
      vid_wrapper
        .find(".bookmark_link")
        .removeClass("no_link")
        .attr("href", eva_master_url + "/watch/" + bookmarked_video._id)

      vid_wrapper
        .find(".bookmark_link")
        .on("click", function (e) {
          e.stopPropagation();
        })
    } else {
      return;
    }
  }
  // opposite of render_bookmark_link
  var remove_bookmark_link = function remove_bookmark_link (vid_wrapper) {
    void 0;
    vid_wrapper.find(".bookmark_link").addClass("no_link");
  }
  /*
    Very important function!
    1st arg [TYPE: ARRAY]: the array of bookmarked videos from AJAX call to /api/chirp/bookmarked/user
    2nd arg [TYPE: OBJECT]: a video_obj
    If the video_obj passed in is found inside the array of bookmarked_videos then it will return an array with that bookmarked video as the first element.
    If the video_obj passed in is not found in the bookmarked_videos array then it will return an empty array.
  */
  var is_video_bookmarked = function is_video_bookmarked(bookmarked_videos, video_obj) {
    void 0;
    var count = 0;
    bookmarked_videos.filter(function (bookmark) {
      if (bookmark._video === video_obj._id) {
        count++;
      }
    });
    // bookmarked_videos is an array that is set from an ajax request everytime a user logs in or saves/deletes a video.
    if(bookmarked_videos.length) {
      return bookmarked_videos.filter(function (bookmark) {
        if (bookmark._video === video_obj._id) {
          return bookmark;
        }
      });
    }
    return [];
  }
  /*
    1st arg [TYPE: OBJECT]: video object
    Creates a bookmarked video based on the video object passed in, promise resolves with the bookmarked video object and video object
  */
  var create_bookmarked = function create_bookmarked(video_obj, title) {
    void 0;
    void 0;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: eva_master_url + '/api/chirp/bookmarked',
        method: 'POST',
        dataType: 'json',
        data: {
          _video: video_obj._id,
          tags: [],
          title: title,
          position_t : (video_obj == 0) ? video_obj.position.t : video_obj.position.t.toFixed(2),
          position_e : (video_obj == 0) ? video_obj.position.e : video_obj.position.e.toFixed(2)
        },
        success: function (chirp_data) {
          resolve({
            chirp_data: chirp_data,
            video_obj: video_obj
          })
        }
      })
    })
  }
  /*
    1st arg [TYPE: OBJECT]: the bookmarked video object to remove from the user
    2nd arg [TYPE: OBJECT](OPTIONAL): the video object is optional and only there to pass on data
    Removes the bookmarked chirp specified in the 1st argument
  */
  var remove_bookmarked = function remove_bookmarked(chirp_data, video_obj) {
    void 0;
    if ((video_obj.vid_ref.host == "youtube" || video_obj.vid_ref.host == "vimeo") && !video_obj.web) {
      bookmarked_videos = [];
      // save_video(video_obj);
    }
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: eva_master_url + "/api/chirp/bookmarked/delete",
        data: chirp_data,
        method: 'POST',
        success: function (saved_chirp) {
          resolve({ video_obj: video_obj });
        }
      })
    })
  }
  /*
    1st arg [TYPE: ANYTHING](OPTIONAL): Any data that needs to be passed on in a promise chain
    Gets the user's bookmarked videos and sets the global bookmarked_videos
  */
  var get_user_bookmarked = function (data) {
    void 0;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: eva_master_url + '/api/chirp/bookmarked/user',
        method: "GET",
        success: function (user_bookmarked) {
          bookmarked_videos = user_bookmarked;
          resolve({
            user_bookmarked: user_bookmarked,
            video_obj: data.video_obj,
            chirp_data: data.chirp_data
          });
        }
      });
    });
  }
  /*
    1st arg [TYPE: OBJECT]: {
      video_obj: must have the video object,
      chirp_data: must have the bookmarked chirp,
      user_bookmarked: must have the array of bookmarked chirps for the user
    }
    Updates the save button state for the menu save button and the save button on the video.
  */
  var update_btn_states_create = function (data) {
    void 0;
    var id = data.video_obj.vid_ref.id;
    // if viewing saving is visible, stop spinner and show 'video saved message.'
    if (!$('#saving_view').is(':visible')) {
      $('#venvy-spinner').hide();
      $('#end_view').show();
      parent.postMessage({ eva_msg: 'fade_out' }, '*');
    }

    // if menu with title is visible. runs save video.
    // Temp: removed
    // if (!$add_title_menu.is(':visible') && $('#saving_view').is(':visible')) {
    //   $('#saving_view').hide();
    //   save_video(data.video_obj);
    // }

    // save icon inside video
    var save_btn = $(".eva_" + id).find(".save_btn");
    // checks if video is bookmarked
    var bookmarked_video = is_video_bookmarked(data.user_bookmarked, data.video_obj)[0];

    render_bookmark_link($(".eva_" + id), data.chirp_data);

    set_save_btn_state(save_btn, bookmarked_video, id);
    // remove the onclick handler for the save button.
    save_btn.unbind("click").on("click", data.video_obj, save_btn_handler);

    parent.postMessage({
      eva_msg: "update_bookmark_btn_state",
      video_obj: data.video_obj,
      bookmarked_list: data.user_bookmarked
    }, "*");
  };

  // Same as above but for removing the save state
  var update_btn_states_remove = function (data) {
    void 0;
    var id = data.video_obj.vid_ref.id;

    var length = Object.keys(videos).length;

    // if (length < 2) $add_title_menu.show();
    // else 
      $video_wrapper.show();

    $('#venvy-spinner').hide();

    var save_btn = $(".eva_" + id).find(".save_btn");
    var bookmarked_video = is_video_bookmarked(data.user_bookmarked, data.video_obj)[0];

    remove_bookmark_link($(".eva_" + id));

    set_save_btn_state(save_btn, bookmarked_video, id);
    
    save_btn.unbind("click").on("click", data.video_obj, save_btn_handler);
    parent.postMessage({
      eva_msg: "update_bookmark_btn_state",
      video_obj: data.video_obj,
      bookmarked_list: data.user_bookmarked
    }, "*");
  };

  // Renders the menu error message for videos that cannot be retrieved
  var render_video_error = function render_video_error(obj) {
    void 0;
    $video_wrapper.prepend("<p>" + obj.error + "</p>");
  }
  // Generic ajax request wrapper
  var eva_ajax = function eva_ajax(path, method) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: eva_master_url + path,
        method: method ? method.toUpperCase() : 'GET',
        success: function(data) {
          resolve(data);
        }
      });
    });
  };

  /*
  EVENT HANDLERS
  */
  // Event handler for the save button in the menu
  // 1st arg [TYPE: EVENT OBJECT]
  // no longer used. 
  var save_btn_handler = function save_btn_handler(e){
    void 0;
    var that = e.currentTarget;
    var video_obj = e.data;
    // Removes any click events from save button and appends the spinner
    e.stopPropagation();
    e.preventDefault();
    // bookmarked is either the bookmarked chirp object or null
    var bookmarked = is_video_bookmarked(bookmarked_videos, video_obj)[0];
    if(bookmarked) {
      remove_bookmarked(bookmarked, video_obj)
        .then(get_user_bookmarked)
        .then(update_btn_states_remove);
    } else {
      save_video(video_obj);
      open_menu(video_obj);
    }
  };

  var save_from_video = function(video_obj, title) {
    void 0;
    void 0;
    return new Promise(function (resolve, reject) {
      var bookmarked_video = is_video_bookmarked(bookmarked_videos, video_obj)[0]; 
      return create_bookmarked(video_obj, title)
        .then(function(res) {
          parent.postMessage({ eva_msg: 'saving_complete' , video_obj : video_obj }, '*');
          return res;
        })
        .then(get_user_bookmarked)
    })
  }

  // event handler for saving videos in the extension menu. calls set_bookmark_event and unbinds the click handler.
  var save_video = function save_video (video_obj) {
    void 0;
    if (!$('#saving_view').is(':visible')) {
      video_obj = video_obj.data || video_obj;
      video_obj_save = video_obj;
      var id = video_obj.vid_ref.id;
      var bookmarked_video = is_video_bookmarked(bookmarked_videos, video_obj)[0];
      $('#venvy-bookmark').addClass('vid' + id);
      if (typeof bookmarked_video == "object") $('#venvy-bookmark').html("Unsave");
      else $('#venvy-bookmark').html("Save");
      set_bookmark_event(video_obj);
      $('#venvy-clip').unbind('click').on('click', video_obj, clip_btn_handler);
      // show_input();
    }
  }

  // on click handler that packages the data (title value) and sends it off to api.
  var set_bookmark_event = function (video_obj) {
    void 0;
    $('#venvy-bookmark').unbind('click').on('click', function () {
      var bookmarked_video = is_video_bookmarked(bookmarked_videos, video_obj)[0];
      var title = $('#venvy-title')[0].value;
      var text = this.innerHTML;
      // $add_title_menu.hide();
      $('#venvy-spinner').show();
      if (text == "Save") {
        create_bookmarked(video_obj, title)
          .then(get_user_bookmarked)
          .then(update_btn_states_create);
      }
      else if (text == "Unsave") {
        remove_bookmarked(bookmarked_video, video_obj)
          .then(get_user_bookmarked)
          .then(update_btn_states_remove);
      }
      parent.postMessage({ eva_msg: 'start_spinner', id: video_obj.vid_ref.id }, '*');
    });
  }

  var open_menu = function open_menu (video_obj) {
    void 0;
    parent.postMessage({ eva_msg: "open_menu" }, '*');
    // if ($('#venvy-bookmark').text() == 'Save') { // save or unsave. 
    //   var place = 8;
    //   countDown = setInterval(function () {
    //     if (place) { 
    //       $('#venvy-title')[0].placeholder = 'Title for reminder . . . auto-saving in ' + place;
    //       place--;
    //     } else { // if 0
    //       parent.postMessage({ eva_msg: 'start_spinner', id: video_obj.vid_ref.id }, '*');
    //       // $add_title_menu.hide();
    //       $('#venvy-title')[0].placeholder = 'Give the video a title to remind for later.';
    //       $('#saving_view').show();
    //       $('#venvy-spinner').show();
    //       parent.postMessage({ eva_msg: 'fade_out' }, '*');
    //       create_bookmarked(video_obj)
    //         .then(get_user_bookmarked)
    //         .then(update_btn_states_create);
    //       clearInterval(countDown);
    //     }
    //   }, 1000);
    // }
    // else show_input();
  }

  // var show_input = function show_input () {
  //   if (!$add_title_menu.is(':visible')) {
  //     parent.postMessage({ eva_msg: "change_height", amount: '140px' }, "*");
  //     $('html').css({ overflow: 'hidden' });
  //     $video_wrapper.hide();
  //     $('#no_video').hide();
  //     $add_title_menu.show();
  //     $('#profile-login').hide();
  //     $('#venvy-spinner').hide();
  //     $('#end_view').hide();
  //     $('#saving_view').hide();
  //   }
  // }

  var show_wrapper = function show_wrapper () {
    void 0;
    $('#venvy-spinner').hide();
    $('#end_view').hide();
    $('#saving_view').hide();
    $('#no_video').hide();
    // $add_title_menu.hide();
    $video_wrapper.show();
    // if ($show_more.is(":visible")) {
    //   var amount = "180px";
    // }
    var amount = "340px";
    parent.postMessage({
      eva_msg: "change_height",
      amount: amount
    }, "*");
    $('html').css({ overflow: 'scroll' });
  }

  var show_spinner = function show_spinner () {
    void 0;
    // $add_title_menu.hide();s
    $video_wrapper.hide();
    $('#end_view').hide();
    $('#saving_view').hide();
    $('#venvy-spinner').show();
  }

  var clip_btn_handler = function clip_btn_handler(e) {
    void 0;
    void 0;
    // e.stopPropagation();
    parent.postMessage({
      eva_msg: "deploy_theater",
      video_obj: e.data,
      title: $('#venvy-title')[0].value
    }, "*");
    parent.postMessage({
      eva_msg: 'pause_all'
    }, '*');
  }

  var show_more_videos = function show_more_videos () {
    void 0;
    $show_more.hide();
    $('.menu_video').remove();
    for (var id in videos) {
      render_video(videos[id]);
    }
    parent.postMessage({
      eva_msg: "change_height",
      amount: "420px"
    }, "*");
    $('html').css({ overflow: 'scroll' });
  }
  $show_more.on('click', show_more_videos);

  // Return ext_menu to condensed form
  var show_less_videos = function show_less_videos () {
    void 0;
    // Remove all videos that are not the "video_in_view"
    video_in_view = video_in_view || Object.keys(videos)[1];
    for (var id in videos) {
      if (id != video_in_view) {
        $('.eva_' + id).remove();
      }
    }
    $show_more.show();
  };

  // Place video in correct order in ext_menu (based on the 
  // order of the actual page) in relation to videos already 
  // rendered in ext_menu
  var put_in_correct_spot = function put_in_correct_spot (html, id) {
    void 0;
    orderIDs = orderIDs || Object.keys(videos);
    var index = orderIDs.indexOf(id); // Index of video being rendered
    // Cycling through the rendered videos, to find the appropriate
    // place for the video beign rendered
    for (var i = 1; i < $video_wrapper.children().length; i++) {
      id = $video_wrapper.children().eq(i)[0].className.slice(30);
      // Upon reaching a video that has a larger id,
      // which is, then, further down in the menu
      if (index < orderIDs.indexOf(id)) {
        $('.eva_' + id).before(html); // Render video before this video
        return;
      }
    }
    // If no video is further down than the one being rendered,
    $video_wrapper.append(html); // then render at bottom of list
  };

  // Renders a video in the menu when passed a video object
  var render_video = function render_video(video_obj) {
    void 0;
    var video_wrapper_class = ".eva_" + video_obj.vid_ref.id;
    var video_wrapper_html = video_wrapper_div_html(video_obj);
    var length = Object.keys(videos).length;
    // If ext_menu closed, or ext_menu in condensed form
    if (!$video_wrapper.is(':visible') || $show_more.is(':visible')) {
      // If the video is the "video_in_view," or no videos are rendered
      if (video_in_view == video_obj.vid_ref.id || !$('.menu_video').length) {
        $('.menu_video').remove(); // Remove videos
        $video_wrapper.prepend(video_wrapper_html); // and replace
      }
    }
    // If ext_menu in "enlarged" form
    else put_in_correct_spot(video_wrapper_html, video_obj.vid_ref.id);
    $(video_wrapper_class).unbind('click').on("click", video_obj, function() {
      void 0;
      void 0;
      parent.postMessage({ eva_msg: 'scroll_to', id: video_obj.vid_ref.id }, '*');
    });
    // If one video found on page
    if (length === 1) {
      // Wait, in case, more videos found
      (function (video_obj) {
        setTimeout(function () {
          // If still only one video
          if (Object.keys(videos).length === 1) {
            save_video(video_obj); // Load input menu
          }
          else show_wrapper(); // Load "video_wrapper" menu
        }, 500);
      }) (video_obj);
    }
    else if (length === 2) show_wrapper();
  }

  var open_title_menu = function (e) {
    void 0;
    // Tell vendor script to scroll to chosen video
    parent.postMessage({ eva_msg: 'scroll_to', id: e.data.vid_ref.id }, '*');
    save_video(e);
  };

  // click handler for the log out button in the menu
  var logout_handler = function logout_handler(){
    $("#profile-logout").hide();
    //$("#profile-login").text("Loading...");
    eva_ajax("/api/logout").then(function(data){
      parent.postMessage({
        eva_msg: "update_tabs_auth"
      }, "*");
      getUser();
    })
  };

  // click handler for checking the notification box
  // var notifications_handler = function notifications_handler() {
  //   var checked = $("#toggle_notifications")[0].checked;
  //   localStorage.setItem('checked', checked);
  //   parent.postMessage({
  //     eva_msg: "toggle_notifications",
  //     toggle: checked
  //   }, "*")
  // }

  // Click handler for clicking the x button on the menu, which,
  // depending on context, either reveals the "video_wrapper" menu,
  // or exits the menu altogether
  var exit_menu_handler = function exit_menu_handler() {
    void 0;
    stop_countdown();
    var wrapper_vids = $video_wrapper.children().length;
    var wrapper_vis = $video_wrapper.is(":visible");
    var end_vis = $("#end_view").is(":visible");
    // $('#profile-login').hide()
    if ((!wrapper_vis && Object.keys(videos).length < 2) || wrapper_vis || end_vis) {
      void 0;
      parent.postMessage({ eva_msg: "close_menu" }, "*");
      if (!$('#show_more').is(':visible')) show_less_videos();
    }
    else show_wrapper();
  }

  var stop_countdown = function stop_countdown () {
    void 0;
    if (countDown) {
      clearInterval(countDown);
      $('#venvy-title')[0].placeholder = 'Title for reminder';
    }
  }

  // $add_title_menu.mouseover(stop_countdown);

  var window_listener = function window_listener(e) {
    var msg = e.data.eva_msg;
    if (msg == "updateUserLoginBtn") { // sent from the extension inject script
      void 0;
      context = e.data.context
      getUser();
    } else if (msg == 'authenticate_user') {
      void 0;
      authenticateuser(e.data);
    } else if (msg == "send_menu_data") { // sent from vendor scripts
      void 0;
      var video_obj = e.data.video_obj;
      // if ((video_obj.vid_ref.host == "youtube" || video_obj.vid_ref.host == "vimeo") && !video_obj.web) {
        // save_video(video_obj);
        // videos['video'] = video_obj;
      // } else {
        var id = video_obj.vid_ref.id;
        // if not youtube
        if (!videos[id]) {
          videos[id] = video_obj;  
          // render the video in menu after filtering
          render_video(video_obj);        
        }
      // }
    } else if (msg == "menu_data_error") {
      if (e.data.eva_error_fb) {

      } else if (e.data.eva_error_yt) {
        $video_wrapper.empty();
        render_video_error({
          error: "The current video cannot be clipped."
        })
      } else if (e.data.eva_error_vine) {

      }
    } else if (msg == "clear_menu") {
      $video_wrapper.empty();
    } else if (msg == "ext_version") {
      void 0;
      // called only for safari automatic update
      eva_ajax("/api/safari/version", "GET")
        .then(function (data) {
          latest_version = data.version;
          if (latest_version !== e.data.version) {
            void 0;
            $('body').html("<div class='ext-drop-menu'><span id='exit_menu'>&#10005;</span><div class='eva-install'><div class='component-header'>New Version Available</div><div class='eva-install-msg'>Please remove this version once the " + latest_version + " is installed.</div><a href='/downloads/eclips.safariextz' id='safari_version'>Install Eclips " + latest_version + "</a></div></div>");
            $('body').find('#exit_menu').on('click', function() {
              parent.postMessage({ eva_msg: "close_menu" }, "*");
            })
          }
        });
    // } else if (msg == "toggle_notifications") {
      // Sent from inject, this is to inform all instances of menus to update its toggle state
      // $("#toggle_notifications")[0].checked = e.data.toggle;

      // 09/10/2016
      // parent.postMessage({
      //   eva_msg: "send_notification_state",
      //   toggle: e.data.toggle
      // }, "*");
      
    }  else if (msg == "video_save_btn") {
      void 0;
      // Sent from vendor script to update menu save button state based on video save button state.
      if (e.data.action == "bookmark_from_video") {
        // old code that opened the extension menu to save
        // open_menu(e.data.video_obj);
        // save_video(e.data.video_obj);
        void 0;
        // 09/12/16: gets straight to business of saving and updating buttons in video.
        // postmessage isn't designed to do callbacks, so done animation behavior is all in wrapped fn below.
        save_from_video(e.data.video_obj, e.data.title)
      } else if (e.data.action == "remove_from_video") {
        show_spinner();
        remove_bookmarked(e.data.chirp_data, e.data.video_obj)
          .then(get_user_bookmarked)
          .then(update_btn_states_remove);
      }
    } else if (msg == "showing") {
      void 0;
      var no_video_vis = $('#no_video').is(':visible');
      var log_in_vis = $('#profile-login').is(':visible');
      var length = Object.keys(videos).length;
      void 0;
      if (!no_video_vis && !log_in_vis) {
        void 0;
        var host = video_obj_save ? video_obj_save.vid_ref.host : '';
        if (host == 'youtube' || host == 'vimeo') {
          show_wrapper();
          // open_menu(video_obj_save);
          void 0;
        } else if (length < 2) { 
          show_wrapper();
          // show_input(); // Rmeoved
          void 0
        } else { 
          show_wrapper();
          void 0
        }
      }
      show_wrapper()
      void 0;
    } else if (msg == "closing") {
      // parent.postMessage({
      //   eva_msg: "update_bookmark_btn_state",
      //   bookmarked_list: bookmarked_videos,
      //   video_obj: video_obj_save
      // }, "*");
      void 0;
      if (!$show_more.is(':visible')) show_less_videos();
    } else if (msg == 'video_in_view') {
      // If ext_menu in condensed form
      if ($show_more.is(':visible')) {
        // Render "video_in_view"
        video_in_view = e.data.id;
        $('.eva_' + video_in_view).remove();
        if (videos[video_in_view]) render_video(videos[video_in_view]);
      }
    } else if (msg == 'order_on_page') {
      orderIDs = e.data.orderIDs;
    } else if (msg == 'stop_countdown') {
      stop_countdown();
    }
  }

  /*
  EVENTS
  */
  $("#profile-logout").on("click", logout_handler);
  $("#exit_menu").on("click", exit_menu_handler);
  window.addEventListener("message", window_listener);

  parent.postMessage({
    eva_msg: "menu_loaded"
  }, "*")

  // 09/24/16: Moved login verfication to action buttons in video.
  parent.postMessage({
    eva_msg: "start_scripts"
  }, "*");

  /*
  FUNCTIONS ON INIT
  */

  void 0;
  getUser();

});
