$.extend(spa.defaults.components,{rootPath:"app/components/",templateExt:".html",scriptExt:".min.js",callback:null});var _$=document.querySelector.bind(document),_$$=document.querySelectorAll.bind(document),appStorage={},app={api:{liveApiPrefix:"apiRoot/",errorHandle:{}},debug:!1,conf:{},settings:{},uiHelper:{},init:{},utils:{},storage:{},user:{storeName:"",displayName:""},activeGitLab:{apiUrl:"",pid:"",pKey:"",uName:"",uId:"",web:""}};app.conf={issueSeverityLabels:"showstopper,critical,major,normal,minor,enhancement",issueStatusLabels:"Pending,Backlog,In-Progress,Fixing,Fixed,No-Fix,Works-For-Me,Duplicate,More-Info,Invalid-Issue,Done",issueLabelsGrp:{CRITICAL:"showstopper,critical",WARNING:"major"},flyoutTimeout:10,flyoutSort:"desc",dateDisplayFormat:"DD ddd, MMM YYYY hh:mm:ss",lang:{path:"app/language/",ext:".txt",cache:!0,async:!0,callback:function(){document.title=$("<span>"+spa.i18n.text("lbl.appName")+"</span>").text()}}},app.settings={setLang:function(n){_.isString(n)||(n=_.last(spa.urlHash([]))),n=n||"en_US";var a=n.split("_");$("#containerHeader").find("#langSelection").html(a[0].toUpperCase()+' <i class="dropdown '+a[1].toLowerCase()+' flag"></i>'),spa.i18n.setLanguage(n,app.conf.lang)},i18nSpan:function(n){return'<span data-i18n="'+n+'">'+spa.i18n.text(n)+"</span>"},dtLang:function(){var n=" -- "+app.settings.i18nSpan("dtLang.selected")+": %d",a=app.settings.i18nSpan("dtLang.sInfo.showing")+" _START_ "+app.settings.i18nSpan("dtLang.sInfo.to")+" _END_ "+app.settings.i18nSpan("dtLang.sInfo.of")+" _TOTAL_",t="("+app.settings.i18nSpan("dtLang.sInfo.filteredFrom")+" _MAX_ "+app.settings.i18nSpan("dtLang.sInfo.entries")+")";return{sEmptyTable:app.settings.i18nSpan("dtLang.sEmptyTable"),sInfoEmpty:app.settings.i18nSpan("dtLang.sInfoEmpty"),sZeroRecords:app.settings.i18nSpan("dtLang.sZeroRecords"),sInfo:a,sInfoFiltered:t,sLoadingRecords:app.settings.i18nSpan("dtLang.sLoadingRecords"),sProcessing:app.settings.i18nSpan("dtLang.sProcessing"),sSearch:app.settings.i18nSpan("dtLang.sSearch"),select:{rows:{0:"",1:n,_:n}}}}};

$.extend(spa.api,{isCallSuccess:function(){return!0},onReqError:function(r,e,a){app.api.errorHandle.hasOwnProperty(r.status)?app.api.errorHandle[r.status](r,e,a):app.api.errorHandle.Unknown(r,e,a)},onResError:function(){}}),app.api.errorHandle["400"]=function(){app.uiHelper.showAlert("warning","alert.msg.req.error.400",function(){app.auth.clearSession()})},app.api.errorHandle["401"]=function(){app.uiHelper.showAlert("warning","alert.msg.req.error.401")},app.api.errorHandle["403"]=function(){app.uiHelper.showAlert("warning","alert.msg.req.error.403",function(){app.auth.clearSession()})},app.api.errorHandle["404"]=function(){app.uiHelper.showAlert("warning","alert.msg.req.error.404")},app.api.errorHandle["408"]=function(){app.uiHelper.showAlert("warning","alert.msg.req.error.408",function(){app.auth.clearSession()})};var lastFailedjqXHR;app.api.errorHandle.Unknown=function(r){lastFailedjqXHR=r,console.log("Inspect lastFailedjqXHR for more details."),app.uiHelper.showAlert("warning","alert.msg.req.error.Unknown")};

$.extend(spa.api.urls,{gitLabProfile:"apiRoot/user",gitLabProjects:"apiRoot/projects",gitLabProjectMembers:"apiRoot/projects/{pid}/members?per_page=100&page=1",gitLabIssues:"apiRoot/projects/{pid}/issues?per_page=100&page=1&order_by=updated_at&sort=desc&state=opened",gitLabIssueNotes:"apiRoot/projects/{pid}/issues/{issueId}/notes?per_page=100&page=1",gitLabIssueNotesNew:"apiRoot/projects/{pid}/issues/{issueId}/notes",gitLabIssueDetails:"apiRoot/projects/{pid}/issues/{issueId}",gitLabIssueAssignTo:"apiRoot/projects/{pid}/issues/{issueId}?assignee_id={mid}",gitLabIssueClose:"apiRoot/projects/{pid}/issues/{issueId}?state_event=close"});

app.utils.callFunction=function(e,a){"use strict";if(_.isString(e)){var n=spa.findSafe(window,e);_.isFunction(n)&&n.call(window,a)}},$.confirmDialog=function(e){"use strict";$.confirmClose(!0);var a,n,i=(e.type||e.confirmType||e.confirmtype).toLowerCase(),t=i.indexOf("loader")>=0?'<div class="loader"></div>':"",s=e.id||"confirmDlg_"+spa.now(),p=spa.i18n.text(e.title||"confirm.title."+i),o=spa.i18n.text(e.message||e.msg||e.m,spa.toJSON(e.data)),r="";$.each(e.buttons,function(e,i){a=i.id||"DlgBtn_"+e.replace(/[^a-zA-Z0-9]/g,""),n=spa.i18n.text(i.i18n||"common.dialog.btn."+e),r+='<button class="ui button primary" id="'+a+'">'+n+"</button>"});var l=['<div class="ui dimmer dialogbox visible active" id="',s,'">','<div class="ui small modal visible active">','<div class="header center"><i class="stl-icons ',i,'"></i><span>',p,"</span></div>",'<div class="content center"><div class="cicons ',i,'"></div>',o,"</div>",t,'<div class="actions center ',e.buttonstatus||e.buttonStatus||"show",'">',r,"</div></div></div>"].join("");$(l).hide().appendTo("body").fadeIn();var c=$(".ui.dialogbox .button").filter(":visible"),u=0;$.each(e.buttons,function(a,n){$(c.eq(u++)).off("click").on("click",function(){return n.action&&n.action(e.data),$.confirmClose(),!1})}),spa.setFocus($(".ui.dialogbox .button").filter(":visible")[e.defaultBtn||0])},$.confirmClose=function(e){"use strict";var a=$(".ui.dimmer.dialogbox");e?a.remove():a.fadeOut(function(){$(this).remove()})},app.uiHelper.indicateLoading=function(e,a){$(e)[a+"Class"]("loading")},app.uiHelper.activateTab=function(e,a){var n=$(e);n.find(".ui.menu .item, .ui.tab").removeClass("active"),n.find('[data-tab="'+a+'"]').addClass("active")},app.uiHelper.utcToLocal=function(e){return spa.isBlank(e)?"-":moment.utc(e).local().format(app.conf.dateDisplayFormat)},app.uiHelper.webHelper=function(){var e=$(".container-component[data-help]:visible").data("help"),a=app.conf.webHelpUri+(e?"?topic="+e:"");$("#helpLauncher").attr("href",a)[0].click()},app.uiHelper.updateGitLabImageSrc=function(e){var a=']<br/><img class="img-screenshot-thumb" onclick="app.uiHelper.openInNewTab(this.src)" src="'+(app.activeGitLab.web||"");return(e||"").replace(/\]\(/g,a).replace(/\n/g,"<br/>").replace(/\.PNG\)/g,'.PNG"/>').replace(/\.png\)/g,'.png"/>').replace(/\.GIF\)/g,'.GIF"/>').replace(/\.gif\)/g,'.gif"/>').replace(/\.JPG\)/g,'.JPG"/>').replace(/\.jpg\)/g,'.jpg"/>').replace(/\.JPEG\)/g,'.JPEG"/>').replace(/\.jpeg\)/g,'.jpeg"/>')},app.uiHelper.openInNewTab=function(e){$("#xLinkLauncher").attr("href",e)[0].click()},app.uiHelper.setBackground=function(){"use strict";$("body").addClass("bg-image"),$(".authBlock").addClass("hide")},app.uiHelper.unsetBackground=function(){"use strict";$("body").removeClass("bg-image"),$(".authBlock").removeClass("hide"),$("#userDisplayName").html(app.user.displayName)},app.uiHelper.clearSignInServerErrorMsg=function(){return app.uiHelper.clearSSErrorMsg("#containersignIn"),!0},app.uiHelper.clearSSErrorMsg=function(e){var a=$(e),n=a.find(".SS-ERR-MSG");return n.html(""),n.closest(".message").addClass("hide"),!0},app.uiHelper.showSSErrorMsg=function(e,a){var n=$(e),i=n.find(".SS-ERR-MSG");return i.i18n(a),i.closest(".message").removeClass("hide"),!0},app.uiHelper.showAlert=function(e,a,n,i){"use strict";"string|object".containsStr(typeof n)&&(i=arguments[2],n=arguments[3]),$.confirmDialog({title:e.toProperCase(),message:a,type:e,data:i,buttons:{Ok:{action:function(e){n&&n(e)}}}})},app.uiHelper.closeModal=function(e){$(e||".ui.modal:visible").modal("hide").modal("hide dimmer")},app.uiHelper.flyout=function(e,a,n,i){"use strict";"string|object".containsStr(typeof n)&&(i=arguments[2],n=arguments[3]),n===void 0&&(n=app.conf.flyoutTimeout);var t=spa.i18n.text(a,spa.toJSON(i)),s={asc:"append",desc:"prepend"},p=new Date,o="fo_"+spa.now()+"_"+spa.rand(1e3,9999),r=$(".flyout"),l='<div class="flyout-wrap" id="'+o+'"><div class="flyout-box '+e+'">'+'<div class="flyout-header"><span>'+p.yyyymmdd("-")+" "+p.hhmmss(":")+'</span><div class="close">X</div></div>'+'<div class="content">'+t+"</div></div></div>";spa.isElementExist(".flyout-control")||r.append('<div class="flyout-control" title="Notifications">5</div>'),r[s[app.conf.flyoutSort]](l),n&&setTimeout(function(){$("#"+o).fadeOut(500)},1e3*n),$(".flyout-control").html(r.find(".flyout-wrap").length)},$(document).on("click",".flyout .close",function(){"use strict";$(this).closest(".flyout-wrap").fadeOut(500).remove();var e=$(".flyout");e.find(".flyout-wrap").length||e.find(".flyout-control").remove(),$(".flyout-control").html(e.find(".flyout-wrap").length)}),$(document).on("click",".flyout-control",function(){"use strict";var e=$(".flyout .flyout-wrap");e.find(":visible").length?e.fadeOut(500):e.fadeIn(500)}),app.uiHelper.disableBtns=function(e,a){var n=$(e);return n.each(function(e,n){$(n).prop("disabled",!0).find("i.icon").addClass(a?"loading":"")}),n},app.uiHelper.enableBtns=function(e){var a=$(e);return a.each(function(e,a){$(a).prop("disabled",!1).find("i.icon").removeClass("loading")}),a},spa.module("auth",{signUp:function(){"use strict";if(spa.isBlank(spa.validate("#fm_signIn",!0))){app.uiHelper.clearSSErrorMsg("#containersignIn"),app.uiHelper.disableBtns("#fm_signIn #signUpButton",!0);var e=$("#fm_signIn #userName"),a=$("#fm_signIn #userPwd"),n=e.val(),i=a.val();appStorage.hasOwnProperty(n)?app.auth.onSignInFail({i18nKey:"err.signIn.usrNameAlreadyFound"}):(appStorage[n]={key:Sha256.hash(i)},app.init.updateAppStorage(),app.uiHelper.enableBtns("#fm_signIn #signInButton, #fm_signIn #signUpButton"),app.auth.signIn())}},signIn:function(){"use strict";if(spa.isBlank(spa.validate("#fm_signIn",!0))){app.uiHelper.clearSSErrorMsg("#containersignIn"),app.uiHelper.disableBtns("#fm_signIn #signInButton",!0);var e=$("#fm_signIn #userName"),a=$("#fm_signIn #userPwd"),n=e.val(),i=a.val();appStorage.hasOwnProperty(n)?Sha256.hash(i)===appStorage[n].key?(e.val(""),a.val(""),appStorage.lastSignIn=spa.now(),appStorage.defaultUsr=$("#fm_signIn #rememberMe").is(":checked")?n:"",app.init.updateAppStorage(),app.auth.onSignInSuccess({usrName:n,usrPwd:i})):app.auth.onSignInFail({i18nKey:"err.signIn.incorrectPwd"}):app.auth.onSignInFail({i18nKey:"err.signIn.usrNameNotFound"})}},onSignInSuccess:function(e){"use strict";app.uiHelper.enableBtns("#fm_signIn #signInButton, #fm_signIn #signUpButton"),app.user.storeName=spa.findSafe(e,"usrName","Guest"),app.user.displayName=spa.findSafe(e,"usrName","Guest"),app.user._=sjcl.encrypt(appStorage.lastSignIn,spa.findSafe(e,"usrPwd",""));var a=appStorage[app.user.storeName],n=a.connections;if(!spa.isBlank(n)){var i=n.defaultConnection;spa.isBlank(i)&&(i=Object.keys(n)[0],n.defaultConnection=i,app.init.updateAppStorage());var t=n[i];app.activeGitLab.apiUrl=t.url||"",app.activeGitLab.pid=t.pid||"",app.activeGitLab.pKey=t.key?sjcl.decrypt(sjcl.decrypt(appStorage.lastSignIn,app.user._),t.key):"",app.activeGitLab.uName=t.uname||"",app.activeGitLab.uId=t.uid||"",app.activeGitLab.web=t.web||""}app.uiHelper.unsetBackground(),app.init.usrHome()},onSignInFail:function(e){"use strict";app.uiHelper.enableBtns("#fm_signIn #signInButton, #fm_signIn #signUpButton"),app.uiHelper.showSSErrorMsg("#containersignIn",e.i18nKey)},signOut:function(){"use strict";app.auth.clearSession()},clearSession:function(){"use strict";app.user={},app.activeGitLab={},app.uiHelper.closeModal(),document.location.reload()}});

app.init.ajax=function(){"use strict";$.ajaxPrefilter(function(i){i.url.beginsWithStr(spa.api.urlKeyIndicator)&&(i.url=spa.api.url(i.url.trimLeftStr(spa.api.urlKeyIndicator),i.data));var t=i.url;t.beginsWithStr(app.api.liveApiPrefix)&&(i.beforeSend=function(i){i.setRequestHeader("PRIVATE-TOKEN",app.activeGitLab.pKey)}),i.hasOwnProperty("error")||(i.error=spa.api.onReqError),spa.api.mock||t.beginsWithStr("!")?(i.type="GET",t=t.trimLeftStr("!"),t.beginsWithStr(app.api.liveApiPrefix)&&(t.containsStr("\\?")||(t=t.trimRightStr("/")+"?"),i.url=t.replace(RegExp(app.api.liveApiPrefix),"api_/").replace(/\?/,"/data.json?"),app.debug&&console.warn(">>>>>>Intercepting Live API URL: ["+t+"] ==> ["+i.url+"]"))):i.url=t.replace(RegExp(app.api.liveApiPrefix),app.activeGitLab.apiUrl)})},app.init.updateAppStorage=function(){store.set("krGlit",appStorage)},app.init.appStorage=function(){appStorage=store.get("krGlit"),spa.isBlank(appStorage)&&(appStorage={})},app.storage.getConnectionDetails=function(i){var t=appStorage[app.user.storeName],e=t.connections,a={};if(!spa.isBlank(e)){var n=i||e.defaultConnection;spa.isBlank(n)&&(n=Object.keys(e)[0]),a=e[n],a.conName=n}return a},app.init.app=function(){app.init.appStorage(),app.init.ajax(),app.settings.setLang("en_US"),app.init.usrHome()},app.init.dropDowns=function(i){"use strict";$(i).find(".menu .ui.dropdown").dropdown({on:"click"}),$(i).find(".menu a.item, .vertical .menu .item").on("click",function(){$(this).addClass("active").siblings().removeClass("active")})},app.init.radioTabs=function(i){"use strict";$(i).find(".radiotab").on("click",function(){var i=$(this),t=i.data("tabTarget");app.utils.callFunction(i.data("tabBefore"),i),i.closest(".radiotabs").children(".ui.tab").removeClass("active"),$(t).addClass("active"),app.utils.callFunction(i.data("tabAfter"),i),$("#popup1, #popup2, #popup3").modal("refresh")}),$(i).find(".ui.radio.checkbox").checkbox()},app.init.checkboxs=function(i){"use strict";var t=$(i).find(".ui.checkbox");spa.isBlank(t)&&(t=$(i).filter(".ui.checkbox")),t.checkbox()},app.init.selects=function(i){"use strict";var t=$(i).find("select");spa.isBlank(t)&&(t=$(i).filter("select")),t.dropdown({showOnFocus:!1}),t.each(function(i,t){$(t).closest(".selection.dropdown").children(".text").html(t.value||"")})},app.init.formElements=function(i){"use strict";app.init.checkboxs(i),app.init.selects(i)},app.init.accordions=function(i){"use strict";$(i).find(".ui.accordion").accordion(),$(i).find(".accordion .menu .item a").on("click",function(){$(i).find(".accordion .menu .item").removeClass("active"),$(this).addClass("active")})},app.init.tabs=function(i){"use strict";$(i).find(".menu .item").tab()},app.init.usrHome=function(){app.user.storeName?spa.renderComponents(app.activeGitLab.pid?"issues":"settings"):spa.renderComponents("signIn")},$(document).ready(function(){"use strict";app.init.app()}),$(window).resize(function(){"use strict";dt.resizeTableHeight()});

Handlebars.registerHelper("toLowerCase",function(e){return(e||"").toLowerCase()}),Handlebars.registerHelper("toNumber",function(e){return spa.toInt(e||"")}),Handlebars.registerHelper("toDecimal",function(e){return spa.toFloat(e||"")}),Handlebars.registerHelper("utcToLocal",function(e){return app.uiHelper.utcToLocal(e)}),Handlebars.registerHelper("toHtml",function(e){return(e||"").replace(/\n/g,"<br/>")}),Handlebars.registerHelper("updateMediaLinks",function(e){return app.uiHelper.updateGitLabImageSrc(e||"")}),Handlebars.registerHelper("toIssueSeverity",function(e){return _.filter(e,function(e){return app.conf.issueSeverityLabels.containsStrIgnoreCase(e)}).join("<br/>")}),Handlebars.registerHelper("toIssueStatus",function(e){return _.filter(e,function(e){return app.conf.issueStatusLabels.containsStrIgnoreCase(e)}).join("<br/>")}),Handlebars.registerHelper("compare",function(e,r,n,t){var o,a;if(3>arguments.length)throw Error("Handlerbars Helper 'compare' needs 2 parameters");if(void 0===t&&(t=n,n=r,r="==="),o={"==":function(e,r){return e===r},"===":function(e,r){return e===r},"!=":function(e,r){return e!==r},"!==":function(e,r){return e!==r},"<":function(e,r){return r>e},">":function(e,r){return e>r},"<=":function(e,r){return r>=e},">=":function(e,r){return e>=r},"typeof":function(e,r){return typeof e===r}},!o[r])throw Error("Handlerbars Helper 'compare' doesn't know the operator "+r);return a=o[r](e,n),a?t.fn(this):t.inverse(this)});

