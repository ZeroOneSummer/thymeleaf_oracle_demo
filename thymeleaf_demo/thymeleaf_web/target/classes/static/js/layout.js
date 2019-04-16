/**
 * Created by kyleleeli on 2017/3/9.
 */
function MenuHoverAccept() {
    var self = this;
    self.setup = function () {
        /* common menus */
        $('#navMenu li.dropdown').hover(function () {
            $(this).addClass('active');
            $(this).find('.dropdown-menu').stop(true, true).fadeIn(100);
        }, function () {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(100);
        });

        /* more menu */
        $('#moreMenuBtn').hover(function () {
            $('.dropdown-menu-more').show();
        }, function () {
            $('.dropdown-menu-more').hide();
        });
    };
}

function AutoResizeMenu() {
    var self = this;
    var navMoreWidth = 50;
    var logoMenu = $('#logoMenu'),
        navMore = $('#navMore'),
        navMenu = $('#navMenu'),
        header = $('header'),
        moreMenus = $('#moreMenus');

    var navMenuMaxWidth = 0, navMenuWidth = 0;

    self.calWidth = function () {
        navMenuMaxWidth = header.width()  - navMoreWidth ;// navMore.width();
        // navMenuMaxWidth = header.width() - logoMenu.width()  - navMoreWidth ;// navMore.width();
        navMenuWidth = navMenu.width() + 400;

        //console.log('max width: ' + navMenuMaxWidth + '\nwidth: ' + navMenuWidth);
    };

    self.isOverflow = function () {
        self.calWidth();
        var isOverflow = navMenuWidth > navMenuMaxWidth;
        return isOverflow;
    };

    self.hideMenus = function () {
        var menus = $('#navMenu > li:visible');
        var menuIndex = menus.length - 1;

        //console.log(menus.length);

        while (menuIndex >= 0) {
            if (self.isOverflow()) {
                var menuDOM = menus[menuIndex];
                var menu = $(menuDOM);
                moreMenus.prepend(menu.clone());
                self.adjustWidth(menu.width());
                menu.hide();
            } else {
                break;
            }
            menuIndex--;
        }
        self.dropdown();
    };

    self.canShow = function (addWidth) {
        return (navMenuWidth + addWidth) < navMenuMaxWidth;
    };

    self.adjustWidth = function (width) {
        var container = $('.dropdown-menu-more');
        var _width = container.width();
        container.width(140);
    };

    self.showMenus = function () {
        var menus = $('#navMenu > li:hidden');
        var menuIndex = 0;
        var moreMenu = $('#moreMenus > li');
        var maxLength = menus.length;

        while (menuIndex < maxLength) {
            if (menus.length > 0) {
                if (!self.isOverflow()) {
                    var menuDOM = menus[menuIndex];
                    var width = $(menuDOM).width();
                    if (self.canShow(width)) {
                        $(menuDOM).show();
                        $(moreMenu[menuIndex]).remove();
                        self.adjustWidth($(menuDOM).width() * -1);
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
            menuIndex++;
        }
    };

    self.toggleMoreMenu = function () {
        var show = $('#moreMenus > li').length > 0;
        navMore.toggle(show);
    }

    self.auto = function () {
        self.calWidth();
        self.showMenus();
        self.hideMenus();
        self.toggleMoreMenu();
    };

    self.dropdown = function () {
        $('#moreMenus .dropdown-toggle').dropdown();
        $('#moreMenus > li.dropdown:last-child > ul.dropdown-menu').addClass('dropdown-menu-right');

        $('#moreMenus > li.dropdown').hover(function () {
            $(this).find('> .dropdown-menu').stop(true, true).fadeIn(100);
        }, function () {
            $(this).find('> .dropdown-menu').stop(true, true).fadeOut(100);
        });
    };

    self.setup = function () {
        window.onresize = this.auto;
        window.onload = this.auto;
        window.setInterval(this.auto,100);
    };
}

$(function () {
    new MenuHoverAccept().setup();
    new AutoResizeMenu().setup();

    /*checkbox*/
    $(".check-on").click(function () {
        $(this).toggleClass("check-off");
        if ($(this).hasClass("check-off")) {
            $(this).siblings("#likeName").val("1");
        } else {
            $(this).siblings("#likeName").val("0");
        }
    })
});
