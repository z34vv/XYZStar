// ax.js v2.11.1


//---------------------------------------------------------------------------------
// Global Navigation

function mediaQueriesWin() {
    const width = window.innerWidth;
    const links = document.querySelectorAll('.js-header__nav > a');

    if (width <= 768) {
        links.forEach(function (link) {
            link.addEventListener('click', function (event) {
                const parentElem = this.parentElement;
                parentElem.classList.toggle('active');
                const childUl = parentElem.querySelector('ul');
                if (childUl.style.display === 'none' || childUl.style.display === '') {
                    childUl.style.display = 'block';
                } else {
                    childUl.style.display = 'none';
                }
                event.preventDefault();
            });
        });
    } else {
        links.forEach(function (link) {
            const parentElem = link.parentElement;
            parentElem.classList.remove('active');
            const childUl = parentElem.querySelector('ul');
            childUl.style.display = '';
        });
    }
}

window.addEventListener('resize', function () {
    mediaQueriesWin();
});

window.addEventListener('load', function () {
    mediaQueriesWin();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.js-header__nav--menu');

    if (menuButton) {
        menuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            const controlledElementId = this.getAttribute('aria-controls');
            const controlledElement = document.getElementById(controlledElementId);
            if (controlledElement) {
                controlledElement.setAttribute('aria-hidden', isExpanded);
            }
        });
    }
});

//---------------------------------------------------------------------------------
// Collapsing

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('details').forEach((detail) => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('.js-drawer');

        if (content) {
            if (detail.hasAttribute('open')) {
                content.style.height = `${content.scrollHeight}px`;
            } else {
                content.style.height = '0px';
            }

            summary.addEventListener('click', (e) => {
                e.preventDefault();
                if (detail.hasAttribute('open')) {
                    content.style.height = '0px';
                    content.addEventListener('transitionend', function handler() {
                        detail.removeAttribute('open');
                        content.removeEventListener('transitionend', handler);
                    }, { once: true });
                } else {
                    detail.setAttribute('open', '');
                    content.style.height = `${content.scrollHeight}px`;
                }
            });
        }
    });
});

//---------------------------------------------------------------------------------
// Scroll Restoration Control

document.addEventListener("DOMContentLoaded", function () {
	const htmlTag = document.documentElement;
	if (htmlTag.getAttribute("data-scroll-restoration") === "manual") {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
	}
});

//---------------------------------------------------------------------------------
// Telephone Number Mobile Auto Link v1.0.2

document.addEventListener("DOMContentLoaded", () => {
    const isPhone = /iPhone|Android/.test(navigator.userAgent);

    if (isPhone) {
        const autoLinkPhone = (elements, isCallrw) => {
            elements.forEach((elem) => {
                const imgElement = elem.querySelector("img");
                const originalContent = elem.textContent || (imgElement ? imgElement.getAttribute("alt") : "") || "";
                const phoneNumber = originalContent.replace(/[^0-9]/g, "");
                const link = document.createElement("a");
                link.href = `tel:${isCallrw ? elem.dataset.tel || phoneNumber : phoneNumber}`;
                if (isCallrw) {
                    if (elem.hasAttribute("data-action")) {
                        link.setAttribute("data-action", elem.getAttribute("data-action"));
                    }
                    if (elem.hasAttribute("class")) {
                        link.className = elem.className;
                    }
                    elem.replaceWith(link);
                    link.textContent = originalContent;
                } else {
                    const newSpan = elem.cloneNode(true);
                    link.appendChild(newSpan);
                    elem.parentNode.replaceChild(link, elem);
                }
            });
        };

        autoLinkPhone(document.querySelectorAll("[data-action=call]"), false);
        autoLinkPhone(document.querySelectorAll("[data-action=callrw]"), true);
    }
});

//---------------------------------------------------------------------------------
// Button History Back

document.addEventListener("DOMContentLoaded", function () {
	const button = document.querySelector('button[data-action="historyBack"]');

	if (button) {
		button.addEventListener("click", function () {
			window.history.back();
		});
	}
});

//---------------------------------------------------------------------------------
// Mobile Toggle Menu Close Support

document.querySelectorAll(".js-toggler-close").forEach((element) => {
	element.addEventListener("click", () => {
		const navbarCollapse = document.querySelector(".navbar-collapse");
		navbarCollapse.classList.remove("show");

		const navbarToggler = document.querySelector(".navbar-toggler");
		navbarToggler.setAttribute("aria-expanded", false);
	});
});

//---------------------------------------------------------------------------------
// Toggle Header Class Based on Scroll Position v1.0.1

function toggleHeaderClass() {
    const headerScrollThreshold = 1;
    const lHeader = document.querySelector(".l-header");

    if (window.scrollY > headerScrollThreshold) {
        lHeader.classList.add("js-scroll");
    } else if (lHeader.classList.contains("js-scroll")) {
        lHeader.classList.remove("js-scroll");
    }
}
window.addEventListener("scroll", toggleHeaderClass);
window.addEventListener("DOMContentLoaded", toggleHeaderClass);

//---------------------------------------------------------------------------------
// Update Logo Image Based on Scroll Position v1.0.4

const logoScrollThreshold = 1;
let initialLogoState = null;

function updateLogoImage() {
    const jsLogoInverts = document.querySelectorAll(".js-logo__invert");

    jsLogoInverts.forEach((jsLogoInvert) => {
        if (!jsLogoInvert) {
            return;
        }

        const currentLogoPath = jsLogoInvert.getAttribute("src");
        let lightLogoPath, darkLogoPath;

        if (currentLogoPath.includes("dark")) {
            lightLogoPath = currentLogoPath.replace("dark", "light");
            darkLogoPath = currentLogoPath;
            if (initialLogoState === null) {
                initialLogoState = 'dark';
            }
        } else {
            darkLogoPath = currentLogoPath.replace("light", "dark");
            lightLogoPath = currentLogoPath;
            if (initialLogoState === null) {
                initialLogoState = 'light';
            }
        }

        if (window.scrollY > logoScrollThreshold) {
            if (initialLogoState === 'dark') {
                jsLogoInvert.setAttribute("src", lightLogoPath);
            } else {
                jsLogoInvert.setAttribute("src", darkLogoPath);
            }
        } else {
            if (initialLogoState === 'dark') {
                jsLogoInvert.setAttribute("src", darkLogoPath);
            } else {
                jsLogoInvert.setAttribute("src", lightLogoPath);
            }
        }
    });
}

function initialize() {
    updateLogoImage();
    window.addEventListener("scroll", updateLogoImage);
}

if (document.readyState === 'complete') {
    initialize();
} else {
    window.onload = initialize;
}

//---------------------------------------------------------------------------------
// Gradation Text v1.0.1

document.addEventListener("DOMContentLoaded", function () {
    let gradationElems = document.querySelectorAll(".js-gradationtext");

    gradationElems.forEach((elem) => {
        let text = elem.innerText;
        let startColor = elem.dataset.gradationStart.split(",").map(parseFloat);
        let endColor = elem.dataset.gradationEnd.split(",").map(parseFloat);
        let diffColor = [];

        for (let i = 0; i < 4; i++) {
            diffColor[i] = (endColor[i] - startColor[i]) / (text.length - 1);
        }

        let tag = elem.dataset.tag ? elem.dataset.tag : "span";

        let htmlContent = "";
        for (let i = 0; i < text.length; i++) {
            let thisColor = [];
            for (let j = 0; j < 3; j++) {
                thisColor[j] = Math.floor(startColor[j] + diffColor[j] * i);
            }
            thisColor[3] = (startColor[3] + diffColor[3] * i).toFixed(2);

            htmlContent += `<${tag} style="color: rgba(${thisColor.join(",")})">${text[i]}</${tag}>`;
        }

        elem.innerHTML = htmlContent;
    });
});

//---------------------------------------------------------------------------------
// Pagetop Smooth Scroll v2.1

const pagetopBtn = document.createElement("div");
pagetopBtn.classList.add("js-pagetop");

const scrollToTop = () => {
    window.scroll(0, 0);
};
pagetopBtn.addEventListener("click", scrollToTop);

let isButtonInserted = false;

const insertPagetopButton = () => {
    const insertPoint = document.getElementById('pagetop-insert');

    if (insertPoint) {
        pagetopBtn.classList.add("is-active");
        insertPoint.parentNode.insertBefore(pagetopBtn, insertPoint);
        insertPoint.parentNode.removeChild(insertPoint);
        isButtonInserted = true;
    } else {
        document.body.appendChild(pagetopBtn);
    }
};

document.addEventListener("DOMContentLoaded", insertPagetopButton);

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollProgressPercentage = scrollTop / (scrollHeight - clientHeight);
    const thresholdPercentage = 1.25;

    if (!isButtonInserted && scrollProgressPercentage > thresholdPercentage / 100) {
        pagetopBtn.classList.add("is-active");
    } else if (!isButtonInserted) {
        pagetopBtn.classList.remove("is-active");
    }
});

//---------------------------------------------------------------------------------
// Form Blocked Enterkey

document.addEventListener("DOMContentLoaded", function () {
	const formElements = document.querySelectorAll(
		"form[data-enter-blocked='true'] input:not([type='image']):not([type='button']):not([type='submit']):not([type='reset']), form[data-enter-blocked='true'] select"
	);
	formElements.forEach(function (element) {
		element.addEventListener("keypress", function (e) {
			if (e.which === 13 || e.keyCode === 13) {
				e.preventDefault();
			}
		});
	});
});

//---------------------------------------------------------------------------------
// Gallery Slider v1.0.1

document.addEventListener("DOMContentLoaded", () => {
	const createElem = (tag, classes, attrs) => {
		const elem = document.createElement(tag);
		if (classes) elem.className = classes.join(" ");
		if (attrs)
			Object.entries(attrs).forEach(([k, v]) => elem.setAttribute(k, v));
		return elem;
	};

	const gsWrapper = createElem("div", ["gs-wrapper"], {
		tabindex: "-1",
		role: "dialog",
		"aria-hidden": "true",
	});
	const gsClose = createElem("button", ["gs-close"], {}, "×");
	const gsImage = createElem("div", ["gs-image"]);
	const gsOverlay = createElem("div", ["gs-overlay"], {
		"data-opacity-target": "0.7",
	});

	gsWrapper.append(gsClose, gsImage);
	[gsWrapper, gsOverlay].forEach((elem) => {
		elem.style.display = "none";
		document.body.appendChild(elem);
	});

	const openModal = (imgSrc) => {
		gsImage.innerHTML = `<img src="${imgSrc}">`;
		gsWrapper.style.display = "flex";
		gsOverlay.style.display = "block";
		setTimeout(() => {
			gsWrapper.classList.add("active");
			gsOverlay.classList.add("active");
		}, 10);
		gsWrapper.setAttribute("aria-hidden", "false");
	};

	const closeModal = () => {
		gsWrapper.classList.remove("active");
		gsOverlay.classList.remove("active");
		setTimeout(() => {
			gsWrapper.style.display = "none";
			gsOverlay.style.display = "none";
		}, 300);
		gsWrapper.setAttribute("aria-hidden", "true");
	};

	gsWrapper.addEventListener(
		"click",
		(e) => e.target === gsWrapper && closeModal()
	);
	[gsClose, gsOverlay].forEach((elem) =>
		elem.addEventListener("click", closeModal)
	);

	document
		.querySelectorAll(".gallery-slider")
		.forEach((gallerySlider, galleryIndex) => {
			const mainSlideList = gallerySlider.querySelectorAll(".main-slide");
			const autoplay =
				gallerySlider.getAttribute("data-autoplay") === "true";
			const transition =
				parseInt(gallerySlider.getAttribute("data-transition")) || 3000;
			const zoomEnabled =
				gallerySlider.getAttribute("data-zoom") === null ||
				gallerySlider.getAttribute("data-zoom") === "true";

			if (zoomEnabled) {
				mainSlideList.forEach((slide, index) => {
					slide.querySelector("img").addEventListener("click", () => {
						openModal(
							mainSlideList[currentIndex].querySelector("img").src
						);
					});
				});
			}

			const thumbnailSlidesWrapper = createElem("div", [
				"thumbnail-slides-wrapper",
			]);
			const thumbnailSlides = createElem("div", ["thumbnail-slides"]);
			thumbnailSlidesWrapper.appendChild(thumbnailSlides);
			gallerySlider.appendChild(thumbnailSlidesWrapper);

			mainSlideList.forEach((slide, index) => {
				const thumbnailSlide = createElem("div", ["thumbnail-slide"]);
				const thumbnailImg = createElem("img", null, {
					src: slide.querySelector("img").src,
				});
				thumbnailSlide.appendChild(thumbnailImg);
				thumbnailSlides.appendChild(thumbnailSlide);

				thumbnailSlide.addEventListener("click", () => {
					currentIndex = index;
					changeSlide(index);
				});
			});

			const thumbnailSlideList =
				thumbnailSlides.querySelectorAll(".thumbnail-slide");
			let autoPlayTimeout;
			let currentIndex = 0;
			const mainSlideCount = mainSlideList.length;

			const scrollToThumbnail = () => {
				const activeThumbnail = thumbnailSlides.querySelector(
					".thumbnail-slide.active"
				);
				if (!activeThumbnail) return;
				const thumbnailSlideOffset = activeThumbnail.offsetLeft;
				const thumbnailSlideWidth = activeThumbnail.clientWidth;
				const thumbnailWrapperWidth =
					thumbnailSlidesWrapper.clientWidth;
				const scrollTarget =
					thumbnailSlideOffset -
					(thumbnailWrapperWidth - thumbnailSlideWidth) / 2;
				thumbnailSlidesWrapper.scroll({
					left: scrollTarget,
					behavior: "smooth",
				});
			};

			const alignThumbnailSlides = () => {
				const thumbnailSlides =
					thumbnailSlidesWrapper.querySelector(".thumbnail-slides");
				const thumbnailSlidesWidth = thumbnailSlides.clientWidth;
				const thumbnailWrapperWidth =
					thumbnailSlidesWrapper.clientWidth;
				thumbnailSlidesWrapper.style.justifyContent =
					thumbnailSlidesWidth < thumbnailWrapperWidth
						? "center"
						: "flex-start";
			};

			window.addEventListener("resize", alignThumbnailSlides);
			alignThumbnailSlides();

			const changeSlide = (index) => {
				mainSlideList.forEach((slide, i) => {
					slide.classList.toggle("active", i === index);
					thumbnailSlideList[i].classList.toggle(
						"active",
						i === index
					);
				});
				scrollToThumbnail();
				const caption =
					mainSlideList[index].getAttribute("data-caption") || "";
				const captionElement = gallerySlider.querySelector(".caption");
				if (captionElement) {
					captionElement.textContent = caption;
				}
			};

			const prevSlide = () => {
				clearTimeout(autoPlayTimeout);
				currentIndex =
					(currentIndex - 1 + mainSlideCount) % mainSlideCount;
				changeSlide(currentIndex);
				autoPlay();
			};

			const nextSlide = () => {
				clearTimeout(autoPlayTimeout);
				currentIndex = (currentIndex + 1) % mainSlideCount;
				changeSlide(currentIndex);
				autoPlay();
			};

			const autoPlay = () => {
				if (autoplay) {
					autoPlayTimeout = setTimeout(() => {
						nextSlide();
					}, transition);
				}
			};

			mainSlideList[0].classList.add("active");
			changeSlide(0);
			gallerySlider
				.querySelector(".prev")
				.addEventListener("click", prevSlide);
			gallerySlider
				.querySelector(".next")
				.addEventListener("click", nextSlide);
			autoPlay();
		});
});

//---------------------------------------------------------------------------------
// Table Scroll Hint

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;(t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).ScrollHint=e()}}(function(){return(function e(t,l,s){function n(r,i){if(!l[r]){if(!t[r]){var a="function"==typeof require&&require;if(!i&&a)return a(r,!0);if(o)return o(r,!0);var c=Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=l[r]={exports:{}};t[r][0].call(u.exports,function(e){var l;return n(t[r][1][e]||e)},u,u.exports,e,t,l,s)}return l[r].exports}for(var o="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n})({1:[function(e,t,l){"use strict";function s(e,t){if(null==e)throw TypeError("Cannot convert first argument to object");for(var l=Object(e),s=1;s<arguments.length;s++){var n=arguments[s];if(null!=n)for(var o=Object.keys(Object(n)),r=0,i=o.length;r<i;r++){var a=o[r],c=Object.getOwnPropertyDescriptor(n,a);void 0!==c&&c.enumerable&&(l[a]=n[a])}}return l}t.exports={assign:s,polyfill:function e(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:s})}}},{},],2:[function(e,t,l){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var s=function(){function e(e,t){for(var l=0;l<t.length;l++){var s=t[l];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,l,s){return l&&e(t.prototype,l),s&&e(t,s),t}}(),n=e("es6-object-assign"),o=e("./util"),r={suggestClass:"is-active",scrollableClass:"is-scrollable",scrollableRightClass:"is-right-scrollable",scrollableLeftClass:"is-left-scrollable",scrollHintClass:"scroll-hint",scrollHintIconClass:"scroll-hint-icon",scrollHintIconAppendClass:"",scrollHintIconWrapClass:"scroll-hint-icon-wrap",scrollHintText:"scroll-hint-text",scrollHintBorderWidth:10,remainingTime:-1,enableOverflowScrolling:!0,applyToParents:!1,suggestiveShadow:!1,offset:0,i18n:{scrollable:"scrollable"}},i=function(){function e(t,l){var s=this;!function e(t,l){if(!(t instanceof l))throw TypeError("Cannot call a class as a function")}(this,e),this.opt=(0,n.assign)({},r,l),this.items=[];var i="string"==typeof t?document.querySelectorAll(t):t,a=this.opt.applyToParents;[].forEach.call(i,function(e){a&&(e=e.parentElement),e.style.position="relative",e.style.overflow="auto",s.opt.enableOverflowScrolling&&("overflowScrolling"in e.style?e.style.overflowScrolling="touch":"webkitOverflowScrolling"in e.style&&(e.style.webkitOverflowScrolling="touch"));var t={element:e,scrolledIn:!1,interacted:!1};document.addEventListener("scroll",function(l){l.target===e&&(t.interacted=!0,s.updateItem(t))},!0),(0,o.addClass)(e,s.opt.scrollHintClass),(0,o.append)(e,'<div class="'+s.opt.scrollHintIconWrapClass+'" data-target="scrollable-icon">\n        <span class="'+s.opt.scrollHintIconClass+(s.opt.scrollHintIconAppendClass?" "+s.opt.scrollHintIconAppendClass:"")+'">\n          <div class="'+s.opt.scrollHintText+'">'+s.opt.i18n.scrollable+"</div>\n        </span>\n      </div>"),s.items.push(t)}),window.addEventListener("scroll",function(){s.updateItems()}),window.addEventListener("resize",function(){s.updateItems()}),this.updateItems()}return s(e,[{key:"isScrollable",value:function e(t){var l=this.opt.offset,s=t.element;return s.offsetWidth+l<s.scrollWidth}},{key:"checkScrollableDir",value:function e(t){var l=this.opt,s=l.scrollHintBorderWidth,n=l.scrollableRightClass,r=l.scrollableLeftClass,i=t.element,a=i.children[0].scrollWidth,c=i.offsetWidth,u=i.scrollLeft;c+u<a-s?(0,o.addClass)(i,n):(0,o.removeClass)(i,n),c<a&&u>s?(0,o.addClass)(i,r):(0,o.removeClass)(i,r)}},{key:"needSuggest",value:function e(t){var l=t.scrolledIn;return!t.interacted&&l&&this.isScrollable(t)}},{key:"updateItems",value:function e(){var t=this;[].forEach.call(this.items,function(e){t.updateItem(e)})}},{key:"updateStatus",value:function e(t){var l=this,s=t.element;if(!t.scrolledIn){var n=s.querySelector('[data-target="scrollable-icon"] > span');(0,o.getOffset)(n).top<(0,o.getScrollTop)()+window.innerHeight&&(t.scrolledIn=!0,-1!==this.opt.remainingTime&&setTimeout(function(){t.interacted=!0,l.updateItem(t)},this.opt.remainingTime))}}},{key:"updateItem",value:function e(t){var l=this.opt,s=t.element,n=s.querySelector('[data-target="scrollable-icon"]');this.updateStatus(t),this.isScrollable(t)?(0,o.addClass)(s,l.scrollableClass):(0,o.removeClass)(s,l.scrollableClass),this.needSuggest(t)?(0,o.addClass)(n,l.suggestClass):(0,o.removeClass)(n,l.suggestClass),l.suggestiveShadow&&this.checkScrollableDir(t)}},]),e}();l.default=i,t.exports=l.default},{"./util":3,"es6-object-assign":1},],3:[function(e,t,l){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.append=function e(t,l){var s=document.createElement("div");for(s.innerHTML=l;s.children.length>0;)t.appendChild(s.children[0])},l.addClass=function e(t,l){t.classList?t.classList.add(l):t.className+=" "+l},l.removeClass=function e(t,l){t.classList?t.classList.remove(l):t.className=t.className.replace(RegExp("(^|\\b)"+l.split(" ").join("|")+"(\\b|$)","gi")," ")};var s=l.getScrollTop=function e(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},n=l.getScrollLeft=function e(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0};l.getOffset=function e(t){var l=t.getBoundingClientRect();return{top:l.top+s(),left:l.left+n()}}},{},]},{},[2])(2)});

window.addEventListener("DOMContentLoaded", function () {
	new ScrollHint(".table-responsive");
	new ScrollHint(".table-responsive-sm");
	new ScrollHint(".table-responsive-md");
	new ScrollHint(".table-responsive-lg");
});

//---------------------------------------------------------------------------------
// Dropdown Nav Linkable v1.0.2

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function (navLink) {
        navLink.addEventListener("click", function (e) {
            let target = e.target;
            while (target && target.nodeName !== 'A') {
                target = target.parentNode;
            }

            if (target && target.getAttribute('data-linkable') === 'true' && window.innerWidth > 991) {
                const href = target.getAttribute('href');
                const targetAttr = target.getAttribute('target');
                
                if (href && targetAttr === '_blank') {
                    window.open(href, '_blank');
                } else if (href) {
                    window.location = href;
                }
            }
        });
    });
});

//---------------------------------------------------------------------------------
// Tab Behavior v1.0.1

document.addEventListener("DOMContentLoaded", function () {
	var tabBehaviors = document.querySelectorAll(".js-tab");

	tabBehaviors.forEach(function (behavior) {
		var tabs = behavior.querySelectorAll(".js-tab__button");
		var tabContainer = behavior.querySelector(".js-tab__container");
		var activeTabBody = behavior.querySelector(
			".js-tab__container--body.active"
		);
		var resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				if (entry.target.classList.contains("active")) {
					tabContainer.style.height =
						entry.target.offsetHeight + "px";
				}
			}
		});

		if (activeTabBody) {
			tabContainer.style.height = activeTabBody.offsetHeight + "px";
			resizeObserver.observe(activeTabBody);
		}

		tabs.forEach(function (tab) {
			tab.addEventListener("click", function (event) {
				event.preventDefault();

				var targetId = this.getAttribute("href").slice(1);

				var currentTabBody = behavior.querySelector(
					".js-tab__container--body.active"
				);
				var nextTabBody = behavior.querySelector("#" + targetId);

				if (currentTabBody) {
					resizeObserver.unobserve(currentTabBody);
				}

				resizeObserver.observe(nextTabBody);

				tabs.forEach(function (innerTab) {
					innerTab.classList.remove("active");
				});

				tab.classList.add("active");

				if (currentTabBody) {
					currentTabBody.classList.remove("active");
					currentTabBody.addEventListener(
						"transitionend",
						function handler() {
							this.removeEventListener("transitionend", handler);
							nextTabBody.classList.add("active");
						},
						{ once: true }
					);
				} else {
					nextTabBody.classList.add("active");
				}
			});
		});
	});
});

//---------------------------------------------------------------------------------
// Zoom Image Modal v1.0

document.addEventListener("DOMContentLoaded", () => {
	const createElem = (tag, classes, attrs) => {
		const elem = document.createElement(tag);
		if (classes) elem.className = classes.join(" ");
		if (attrs)
			Object.entries(attrs).forEach(([k, v]) => elem.setAttribute(k, v));
		return elem;
	};

	const imWrapper = createElem("div", ["im-wrapper"], {
		tabindex: "-1",
		role: "dialog",
		"aria-hidden": "true",
	});
	const imClose = createElem("button", ["im-close"], {}, "×");
	const imImage = createElem("div", ["im-image"]);
	const imOverlay = createElem("div", ["im-overlay"], {
		"data-opacity-target": "0.7",
	});

	imWrapper.append(imClose, imImage);
	[imWrapper, imOverlay].forEach((elem) => {
		elem.style.display = "none";
		document.body.appendChild(elem);
	});

	let currentIndex = 0;
	const images = {};

	const openModal = (imgSrc, group) => {
		imImage.innerHTML = `<img src="${imgSrc}">`;
		imWrapper.style.display = "flex";
		imOverlay.style.display = "block";
		setTimeout(() => {
			imWrapper.classList.add("active");
			imOverlay.classList.add("active");
		}, 10);
		imWrapper.setAttribute("aria-hidden", "false");

		if (group) {
			currentIndex = images[group].findIndex((src) => src === imgSrc);
			imWrapper.setAttribute("data-group", group);
		} else {
			imWrapper.removeAttribute("data-group");
		}
	};

	const closeModal = () => {
		imWrapper.classList.remove("active");
		imOverlay.classList.remove("active");
		setTimeout(() => {
			imWrapper.style.display = "none";
			imOverlay.style.display = "none";
		}, 300);
		imWrapper.setAttribute("aria-hidden", "true");
	};

	const changeImage = (direction) => {
		const group = imWrapper.getAttribute("data-group");
		if (!group) return;

		currentIndex += direction;
		if (currentIndex < 0) currentIndex = images[group].length - 1;
		if (currentIndex >= images[group].length) currentIndex = 0;

		imImage.innerHTML = `<img src="${images[group][currentIndex]}">`;
	};

	imWrapper.addEventListener(
		"click",
		(e) => e.target === imWrapper && closeModal()
	);
	[imClose, imOverlay].forEach((elem) =>
		elem.addEventListener("click", closeModal)
	);

	document
		.querySelectorAll('[data-rel="zoom"], [data-rel^="zoom-group"]')
		.forEach((elem) => {
			const group = elem.getAttribute("data-rel");
			const imgSrc = elem.getAttribute("href");
			if (group.startsWith("zoom-group")) {
				const groupName = group.split("-")[2];
				if (!images[groupName]) images[groupName] = [];
				images[groupName].push(imgSrc);
			}
			elem.addEventListener("click", (e) => {
				e.preventDefault();
				openModal(
					imgSrc,
					group.startsWith("zoom-group") ? group.split("-")[2] : null
				);
			});
		});

	document.addEventListener("keydown", (e) => {
		if (imWrapper.getAttribute("aria-hidden") === "true") return;

		if (e.key === "ArrowLeft") {
			changeImage(-1);
		} else if (e.key === "ArrowRight") {
			changeImage(1);
		} else if (e.key === "Escape") {
			closeModal();
		}
	});
});

//---------------------------------------------------------------------------------
// Mobile Scrollbar -> 0

window.addEventListener("resize", function () {
	const styleElement = document.getElementById("dynamic-styles");
	const cssRules =
		window.innerWidth <= 991
			? `
		::-webkit-scrollbar {
				width: 0px;
		}
		::-webkit-scrollbar-thumb {
				background: #888;
		}
		::-webkit-scrollbar-thumb:hover {
				background: #555;
		}
		html {
				overflow-y: overlay;
		}`
			: "";

	if (!styleElement) {
		const newStyleElement = document.createElement("style");
		newStyleElement.id = "dynamic-styles";
		newStyleElement.innerHTML = cssRules;
		document.head.appendChild(newStyleElement);
	} else {
		styleElement.innerHTML = cssRules;
	}
});

window.dispatchEvent(new Event("resize"));
