(function(g){var window=this;var v8=function(a){g.X.call(this,{H:"button",ea:["ytp-offline-slate-button","ytp-button"],L:[{H:"div",N:"ytp-offline-slate-button-icon",L:["{{icon}}"]},{H:"div",N:"ytp-offline-slate-button-text",L:["{{text}}"]}]});this.C=a;this.A=this.o=null;this.hide();this.V("click",this.D,this)},hwa=function(a,b){!a.o&&b&&b.toggleButtonRenderer?a.o=b.toggleButtonRenderer:b&&b.toggleButtonRenderer||(a.o=null);
w8(a)},w8=function(a){if(a.o){if(a.o.isToggled){var b=a.o.toggledText?g.oQ(a.o.toggledText):"";
a.update({text:b,icon:iwa(a.o.toggledIcon)})}else b=a.o.defaultText?g.oQ(a.o.defaultText):"",a.update({text:b,icon:iwa(a.o.defaultIcon)});a.show()}else a.hide()},iwa=function(a){if(!a)return null;
switch(a.iconType){case "NOTIFICATIONS_NONE":return g.SD?{H:"div",ea:["ytp-icon","ytp-icon-notifications-none"]}:{H:"svg",T:{fill:"#fff",height:"24px",viewBox:"0 0 24 24",width:"24px"},L:[{H:"path",T:{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"}}]};case "NOTIFICATIONS_ACTIVE":return g.dE();default:return null}},x8=function(a){g.X.call(this,
{H:"div",
N:"ytp-offline-slate",L:[{H:"div",N:"ytp-offline-slate-bar",L:[{H:"span",N:"ytp-offline-slate-icon",L:[g.SD?{H:"div",ea:["ytp-icon","ytp-icon-live-icon"]}:{H:"svg",T:{fill:"#fff",height:"100%",viewBox:"0 0 24 24",width:"100%"},L:[{H:"path",T:{d:"M16.94 6.91l-1.41 1.45c.9.94 1.46 2.22 1.46 3.64s-.56 2.71-1.46 3.64l1.41 1.45c1.27-1.31 2.05-3.11 2.05-5.09s-.78-3.79-2.05-5.09zM19.77 4l-1.41 1.45C19.98 7.13 21 9.44 21 12.01c0 2.57-1.01 4.88-2.64 6.54l1.4 1.45c2.01-2.04 3.24-4.87 3.24-7.99 0-3.13-1.23-5.96-3.23-8.01zM7.06 6.91c-1.27 1.3-2.05 3.1-2.05 5.09s.78 3.79 2.05 5.09l1.41-1.45c-.9-.94-1.46-2.22-1.46-3.64s.56-2.71 1.46-3.64L7.06 6.91zM5.64 5.45L4.24 4C2.23 6.04 1 8.87 1 11.99c0 3.13 1.23 5.96 3.23 8.01l1.41-1.45C4.02 16.87 3 14.56 3 11.99s1.01-4.88 2.64-6.54z"}},
{H:"circle",T:{cx:"12",cy:"12",r:"3"}}]}]},{H:"span",N:"ytp-offline-slate-buttons"},{H:"span",N:"ytp-offline-slate-messages",L:[{H:"div",N:"ytp-offline-slate-main-text",L:["{{maintext}}"]},{H:"div",N:"ytp-offline-slate-subtitle-text",L:["{{subtitletext}}"]}]}]},{H:"div",N:"ytp-offline-slate-final-day",L:[{H:"div",N:"ytp-offline-slate-final-day-line-1",L:["Dawn of"]},{H:"div",N:"ytp-offline-slate-final-day-line-2",L:["The Final Day"]},{H:"div",N:"ytp-offline-slate-final-day-line-3",L:["-24 Hours Remain-"]}]}]});
this.B=a;this.A=this.o=null;this.C=new g.qt(this.F,1E3,this);this.R(a,"presentingplayerstatechange",this.G);this.R(a,"livestatedata",this.D);this.hide();a=this.B.ia();a.getPlayerResponse()&&(a=a.getPlayerResponse().playabilityStatus)&&this.D(a)},y8=function(a,b,c){if(b){var d=void 0!=b.subtitleText?g.oQ(b.subtitleText):"";
b=c?c:void 0!=b.mainText?g.oQ(b.mainText):"";a.update({maintext:b,subtitletext:d});g.T(a.element,"ytp-offline-slate-single-text-line",!d)}},A8=function(a){g.BV.call(this,a);
this.J=!1;this.K=0;this.G=!1;this.o=window.NaN;this.A=this.B=null;this.C=!1;this.F=null;this.M=-(new g.zn).getTimezoneOffset();this.D=new g.OF(this);g.O(this,this.D);var b=this.g.ia();if(b.Fa){var c=g.Y(this.g);g.UN()?c.experiments.g("live_fresca_v2")&&!g.YL(c)&&(this.J=this.C=!0,this.F=new x8(this.g),g.O(this,this.F),g.qV(this.g,this.F.element,5),(b=b.getPlayerResponse())&&b.playabilityStatus&&(this.A=b.playabilityStatus),this.A?(b=jwa(this.A.liveStreamability&&this.A.liveStreamability.liveStreamabilityRenderer))?
z8(this,b):z8(this,7500):z8(this,1E3)):g.aU(this.g.app.o,"html5.unsupportedlive","YTP_HTML5_NO_AVAILABLE_FORMATS_FALLBACK","nolive.1")}this.D.R(a,"heartbeatparams",this.iL);this.D.R(a,"presentingplayerstatechange",this.jL);this.D.R(a,"videoplayerreset",this.bR);this.D.R(a,"crn_heartbeat",this.hL);this.C&&this.A&&kwa(this,this.A);b=new g.pJ(1E3,0x7ffffffffffff,{priority:0,namespace:"heartbeat"});g.jV(a,[b])},lwa=function(a){a=a.g.ia();
return!!g.CQ(a)&&!a.xr},B8=function(a){var b=a.g.ia();
return lwa(a)?!!a.B:!!b.heartbeatToken},z8=function(a,b){if(!a.o&&a.J){var c=a.g.ia();
if(B8(a)||c.Fa)void 0==b&&(b=a.G?a.C?7500:a.B?1E3*a.B.interval:a.g.ia().heartbeatInterval||6E4:1E3),a.o=g.xE((0,g.C)(a.fS,a),b)}},kwa=function(a,b){var c=b.liveStreamability&&b.liveStreamability.liveStreamabilityRenderer,d=jwa(c),e=a.g.ia();
if(g.WU(a.g).zb()&&!g.LQ(e)&&!a.g.isPeggedToLive())return d;var f=c&&c.streamTransitionEndpoint&&c.streamTransitionEndpoint.watchEndpoint.videoId;if(f)return g.u2(a.g.app,f,void 0,void 0,!0,!0),d;if("OK"==b.status.toUpperCase()){if(!e.hlsvp&&!e.we||a.A&&c&&c.broadcastId!=a.A.liveStreamability.liveStreamabilityRenderer.broadcastId)return c={video_id:e.videoId},e.isLiveDestination&&(c.is_live_destination="1"),a.g.Mn(c),d;g.nV(a.g,"heartbeat")}return d},jwa=function(a){var b=0;
a&&a.pollDelayMs&&(a=(0,window.parseInt)(a.pollDelayMs,10))&&(b=a);return b},C8=function(a,b,c){if(a.o){a.o=window.NaN;
a.K++;var d=a.g.ia();(d.heartbeatSoftFail?0:a.K>=(a.B?a.B.g:d.heartbeatRetries||5))?(b=b?"heartbeat.net":"heartbeat.servererror",d=(d=a.g.ia())&&d.Fa?g.U("YTP_ERROR_STREAM_LICENSE_NOT_FOUND"):g.U("YTP_ERROR_LICENSE"),g.aU(a.g.app.o,b,d,c)):z8(a)}},D8=function(a){a.K=0;
a.o&&(g.vE(a.o),a.o=window.NaN);a.G=!1},mwa=function(a){try{return g.jg(a)}catch(b){return null}};g.p(v8,g.X);
v8.prototype.D=function(){if(!this.A){var a=g.Y(this.C).Mg;this.A=g.$E("youtubei_for_web")?new g.AG(a):new g.O2(a)}var a=this.A.o();if(this.o.isToggled){a.params=this.o.toggledServiceEndpoint.removeUpcomingEventReminderEndpoint.params;var b="notification/remove_upcoming_event_reminder"}else a.params=this.o.defaultServiceEndpoint.addUpcomingEventReminderEndpoint.params,b="notification/add_upcoming_event_reminder";var c={timeout:5E3};c.onError=(0,g.C)(this.B,this);c.gd=(0,g.C)(this.B,this);this.A.A(b,
a,c);this.o.isToggled=!this.o.isToggled;w8(this)};
v8.prototype.B=function(){this.o&&(this.o.isToggled=!this.o.isToggled,w8(this))};g.p(x8,g.X);
x8.prototype.D=function(a){var b=a&&a.liveStreamability&&a.liveStreamability.liveStreamabilityRenderer.offlineSlate;if(b){this.o=a;b.liveStreamOfflineSlateRenderer.canShowCountdown?this.F():y8(this,b.liveStreamOfflineSlateRenderer);var c=this.element;if(b&&b.liveStreamOfflineSlateRenderer&&b.liveStreamOfflineSlateRenderer.scheduledStartTime){var d=b.liveStreamOfflineSlateRenderer.scheduledStartTime-(0,g.G)()/1E3;d=86400>=d&&86340<d}else d=!1;g.T(c,"ytp-offline-slate-show-final-day",d);if(c=a&&a.liveStreamability&&
a.liveStreamability.liveStreamabilityRenderer&&a.liveStreamability.liveStreamabilityRenderer.offlineSlate&&a.liveStreamability.liveStreamabilityRenderer.offlineSlate.liveStreamOfflineSlateRenderer&&a.liveStreamability.liveStreamabilityRenderer.offlineSlate.liveStreamOfflineSlateRenderer.thumbnail){d=0;for(var e=null,f=0;f<c.thumbnails.length;f++)c.thumbnails[f].width>d&&(d=c.thumbnails[f].width,e=c.thumbnails[f].url);e&&(this.element.style.backgroundImage="url("+e+")")}else this.element.style.backgroundImage=
"";b.liveStreamOfflineSlateRenderer.actionButtons?(this.A||(this.A=new v8(this.B),this.A.Ja(this.wa["ytp-offline-slate-buttons"]),g.O(this,this.A)),hwa(this.A,b.liveStreamOfflineSlateRenderer.actionButtons[0])):this.A&&hwa(this.A,null);this.o=a}else this.o=null;this.G()};
x8.prototype.G=function(){var a=g.WU(this.B),b=this.B.ia(),c=b.Fa&&(g.cK(a)||g.W(a,2)||g.W(a,64)),a=a.zb()&&!g.LQ(b)&&!this.B.isPeggedToLive();c&&!a&&this.o&&"LIVE_STREAM_OFFLINE"==this.o.status.toUpperCase()?this.g||(this.show(),this.B.Y("offlineslatestatechange")):this.g&&this.hide()};
x8.prototype.F=function(){var a=this.o&&this.o.liveStreamability&&this.o.liveStreamability.liveStreamabilityRenderer&&this.o.liveStreamability.liveStreamabilityRenderer.offlineSlate&&this.o.liveStreamability.liveStreamabilityRenderer.offlineSlate.liveStreamOfflineSlateRenderer;if(a){var b=Math.floor((0,g.G)()/1E3),c=a.canShowCountdown&&(0,window.parseInt)(a.scheduledStartTime,10);!c||c<=b?(y8(this,a),this.C.stop()):(y8(this,a,g.HV(c-b)),this.C.ce())}};
x8.prototype.X=function(){this.C.dispose();this.C=null;g.X.prototype.X.call(this)};g.p(A8,g.BV);g.h=A8.prototype;g.h.X=function(){D8(this);g.BV.prototype.X.call(this);g.mV(this.g,"heartbeat")};
g.h.hL=function(){this.J=!0;z8(this,2E3)};
g.h.iL=function(a){this.B=a;z8(this,2E3)};
g.h.jL=function(a){g.W(a.state,2)||g.W(a.state,64)?(D8(this),this.C&&(this.J=!0,z8(this,1E3))):(g.W(a.state,1)||g.W(a.state,8))&&z8(this,2E3)};
g.h.bR=function(){3!==this.g.Ya()&&z8(this,2E3)};
g.h.fS=function(){var a=g.Y(this.g),b=this.g.ia();var c=a.baseYtUrl;if(3==this.g.Ya())this.o=window.NaN;else if(g.W(g.WU(this.g),4))this.o=window.NaN;else if(B8(this)||b.Fa){if(!lwa(this)||b.Fa){var d="GET";var e=a.B,a={video_id:b.videoId,heartbeat_token:b.heartbeatToken,c:e.c,cver:e.cver,cbrand:e.cbrand,cmodel:e.cmodel,vvt:b.gg,mdx_environment:b.mdxEnvironment,access_token:b.oauthToken,forced_experiments:a.forcedExperiments,utc_offset_minutes:this.M};(e=g.wQ(b))&&(a.uloc=e);(e=this.g.nh().ingestionTime)&&
(a.ingestion_time=e);c=g.Bg(c+"heartbeat",a)}else d="GET",c=g.Bg(this.B.url,{request_id:g.yO()}),b.gg&&(c=g.Bg(c,{vvt:b.gg}),b.mdxEnvironment&&(c=g.Bg(c,{mdx_environment:b.mdxEnvironment}))),b.oauthToken&&(c=g.Bg(c,{access_token:b.oauthToken}));b.Ik&&(c=g.Bg(c,{internalipoverride:b.Ik}));b.innertubez&&(c=g.Bg(c,{innertubez:b.innertubez}));c=g.Bg(c,{cpn:b.clientPlaybackNonce});g.KE(c,{format:"RAW",method:d,timeout:3E4,Pb:(0,g.C)(this.zJ,this),onError:(0,g.C)(this.yJ,this),gd:(0,g.C)(this.AJ,this),
withCredentials:!0})}else D8(this)};
g.h.zJ=function(a){if(this.o){a=a.responseText;var b=mwa(a);if(b){this.g.za("onHeartbeat",b);var c="ok"==b.status?b.stop_heartbeat?2:0:"stop"==b.status?1:"live_stream_offline"==b.status?0:-1}else c=(c=a.match(nwa))?"0"==c[1]?0:1:-1;if(-1==c)C8(this,!1,"decode");else if(2!=c||B8(this))if(this.K=0,this.o=window.NaN,1==c){this.G=!1;b=this.g;c="YTP_ERROR_LICENSE";var d=mwa(a);d?a=d.reason||g.U(c):((a=a.match(nwa))&&(a=(0,window.parseInt)(a[1],10))&&(c=g.BJ(a)),a=g.U(c));g.aU(b.app.o,"heartbeat.stop",
a,void 0)}else this.G=!0,a=0,this.C&&b&&(a=kwa(this,b),this.g.Y("livestatedata",b)),a?z8(this,a):z8(this);else D8(this),this.G=!0}};
g.h.yJ=function(a){C8(this,!0,"net-"+a.status)};
g.h.AJ=function(){C8(this,!0,"timeout")};
g.h.gL=function(){return!!this.F&&this.F.g};
var nwa=/^GLS\/1.0 (\d+) (\w+).*?\r\n\r\n([\S\s]*)$/;window._exportCheck==g.Ca&&g.v("ytmod.player.heartbeat",A8,void 0);})(_yt_player);