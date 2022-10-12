<template>
  <div ref="rdLayout" class="rd-layout">
    <header class="rd-header" ref="rdHeader">
      <a class="rd-header-logo" href="/" @click.prevent="changePage">
        <span class="rd-image-wrapper">
          <span class="rd-image-container rd-image-container-left">
            <img src="/logo.svg" class="rd-image rd-image-contain" />
          </span>
        </span>
      </a>
      <div class="rd-header-navigation">
        <button
          class="rd-header-navigation-button"
          @click="navHandler(navOpened ? 'close' : 'open')"
        >
          <div class="rd-header-navigation-button-bar"></div>
          <div class="rd-header-navigation-button-bar"></div>
        </button>
      </div>
    </header>
    <nav class="rd-navigation" ref="rdNavigation">
      <div class="rd-navigation-overlay"></div>
      <div class="rd-navigation-container">
        <div class="rd-navigation-header">
          <span class="rd-navigation-name rd-button-text">{{
            company.name
          }}</span>
        </div>
        <div class="rd-navigation-body">
          <div class="rd-navigation-links">
            <span class="rd-navigation-placeholder rd-button-text">Menu</span>
            <div class="rd-navigation-links-container">
              <a
                v-for="(link, i) in company.links"
                :key="i"
                :href="link.href"
                class="rd-navigation-link rd-title"
                @click.prevent="changePage"
              >
                <span class="rd-text">{{ link.name }}</span>
                <span class="rd-text-wrapper">
                  <span class="rd-text-container rd-text-container-left">
                    <span class="rd-text">{{ link.name }}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="rd-navigation-footer">
          <div class="rd-navigation-socials">
            <span class="rd-navigation-placeholder rd-button-text">Social</span>
            <div class="rd-navigation-socials-container">
              <a
                v-for="(social, i) in company.socials"
                :key="i"
                :href="social.href"
                target="_blank"
                class="rd-navigation-social rd-headline"
              >
                <span class="rd-text">{{ social.name }}</span>
                <span class="rd-text-wrapper">
                  <span class="rd-text-container rd-text-container-left">
                    <span class="rd-text">{{ social.name }}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div class="rd-navigation-links">
            <span class="rd-navigation-placeholder rd-button-text"
              >Get in Touch</span
            >
            <a
              class="rd-navigation-link rd-headline"
              :href="`mailto:${company.email}`"
            >
              <span class="rd-text">{{ company.email }}</span>
              <span class="rd-text-wrapper">
                <span class="rd-text-container rd-text-container-left">
                  <span class="rd-text">{{ company.email }}</span>
                </span>
              </span>
            </a>
          </div>
          <div class="rd-navigation-links">
            <span class="rd-navigation-placeholder rd-button-text"
              >Website by</span
            >
            <a
              class="rd-navigation-link rd-headline"
              href="https://redian.id"
              target="_blank"
            >
              <span class="rd-text">Redian Grup</span>
              <span class="rd-text-wrapper">
                <span class="rd-text-container rd-text-container-left">
                  <span class="rd-text">Redian Grup</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <main class="rd-body" ref="rdBody">
      <NuxtPage
        @exit-page="reinitialize"
        @scroll-to="scrollTo"
        :page-state="pageState"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { ComputedRef } from "vue";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import Scrollbar from "smooth-scrollbar";

  const pageState = ref<string>("idle");

  interface Company {
    name: string;
    email: string;
    links: {
      name: string;
      href: string;
    }[];
    socials: {
      name: string;
      href: string;
    }[];
  }

  const company: Company = {
    name: "Redian Grup",
    email: "hello@redian.id",
    links: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "About",
        href: "/about",
      },
      {
        name: "Catalogue",
        href: "/catalog",
      },
      {
        name: "Contact",
        href: "/contact",
      },
    ],
    socials: [
      {
        name: "Facebook",
        href: "https://facebook.com",
      },
      {
        name: "Twitter",
        href: "https://twitter.com",
      },
      {
        name: "Instagram",
        href: "https://instagram.com",
      },
    ],
  };

  const viewMode = useViewMode();

  const bodyScrollbar = ref<Scrollbar>(null);
  const navOpened = ref<boolean>(false);
  const navAnim = ref<GSAPTimeline>(null);

  const rdHeader = ref<HTMLElement>(null);
  const rdNavigation = ref<HTMLElement>(null);
  const rdBody = ref<HTMLDivElement>(null);

  const rem: ComputedRef<number> = computed((): number =>
    typeof getComputedStyle === "function"
      ? parseInt(getComputedStyle(document.body).fontSize)
      : 0
  );

  const animate = {
    init(rdHeader: HTMLElement): void {
      const tl: GSAPTimeline = gsap.timeline();

      const rdImageContainer: HTMLElement = rdHeader.querySelector(
        ".rd-image-container"
      );
      const rdImage: HTMLElement = rdHeader.querySelector(".rd-image");
      const rdNavigationButton: HTMLElement = rdHeader.querySelector(
        "button.rd-header-navigation-button"
      );

      tl.to(rdImageContainer, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          rdImage,
          {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<0"
        )
        .to(rdNavigationButton.children, {
          width: "1rem",
          x: 0,
          duration: 0.25,
        });
    },
    navHandler(
      rdHeader: HTMLElement,
      rdNavigation: HTMLElement,
      cb?: () => void,
      rcb?: () => void
    ): GSAPTimeline {
      const tl: GSAPTimeline = gsap.timeline({
        paused: true,
        onComplete() {
          if (cb) cb();
        },
        onReverseComplete() {
          if (rcb) rcb();
        },
      });

      const rdNavigationButton: HTMLElement = rdHeader.querySelector(
        "button.rd-header-navigation-button"
      );
      const rdNavigationButtonBarOne: HTMLElement =
        rdNavigationButton.querySelector(
          ".rd-header-navigation-button-bar:first-child"
        );
      const rdNavigationButtonBarTwo: HTMLElement =
        rdNavigationButton.querySelector(
          ".rd-header-navigation-button-bar:last-child"
        );
      const rdNavigationOverlay: HTMLElement = rdNavigation.querySelector(
        ".rd-navigation-overlay"
      );
      const rdNavigationContainer: HTMLElement = rdNavigation.querySelector(
        ".rd-navigation-container"
      );

      tl.to(rdNavigation, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.25,
      })
        .to(
          rdNavigationButtonBarOne,
          {
            x: "-0.5rem",
            width: 0,
            duration: 0.25,
          },
          "<0"
        )
        .to(
          rdNavigationButtonBarTwo,
          {
            x: "0.5rem",
            width: 0,
            duration: 0.25,
          },
          "<0"
        )
        .to(rdNavigationButtonBarOne, {
          y: "-0.5rem",
          rotateZ: 45,
          duration: 0,
        })
        .to(rdNavigationButtonBarTwo, {
          y: "-0.5rem",
          rotateZ: -45,
          duration: 0,
        })
        .to(rdNavigationOverlay, {
          x: 0,
          duration: 0.625,
          ease: "power2.out",
        })
        .to(
          rdNavigationContainer,
          {
            x: 0,
            duration: 0.625,
            ease: "power2.out",
          },
          "<0"
        )
        .to(
          rdNavigationContainer,
          {
            opacity: 1,
            duration: 0.375,
            ease: "power2.in",
          },
          "<0"
        )
        .to(
          rdNavigationButtonBarOne,
          {
            x: 0,
            y: 0,
            width: "1rem",
            duration: 0.25,
          },
          "<0"
        )
        .to(
          rdNavigationButtonBarTwo,
          {
            x: 0,
            y: 0,
            width: "1rem",
            duration: 0.25,
          },
          "<0"
        );

      return tl;
    },
  };

  function resizeHandler(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) viewMode.value = "mobile";
    else viewMode.value = "desktop";
  }

  function navHandler(state: "open" | "close"): void {
    if (!navAnim.value) {
      navAnim.value = animate.navHandler(
        rdHeader.value,
        rdNavigation.value,
        () => {
          navOpened.value = true;
        }
      );
    }
    if (state === "open") {
      navAnim.value.play();
    } else {
      navOpened.value = false;
      navAnim.value.reverse();
    }
  }

  function changePage({ target }: TouchEvent | MouseEvent): void {
    if (target instanceof Element) {
      navHandler("close");
      pageState.value = target.getAttribute("href");
    }
  }

  function scrollTo(rdElement: HTMLElement): void {
    if (rdElement instanceof HTMLElement) {
      if (viewMode.value === "desktop") {
        bodyScrollbar.value.scrollTo(
          0,
          rdElement.offsetTop - 5 * rem.value,
          500
        );
      } else {
        const startY: number = window.scrollY;
        const targetY: number = rdElement.offsetTop - 4 * rem.value;
        const diffY: number = targetY - startY;

        let startTimestamp: number = 0;
        function scrollStep(timestamp: number): void {
          if (!startTimestamp) startTimestamp = timestamp;
          const time: number = timestamp - startTimestamp;
          const completedPercent: number = Math.min(time / 500);
          window.scrollTo(0, startY + diffY * easeOutCubic(completedPercent));
          if (time <= 500) {
            requestAnimationFrame(scrollStep);
          }
        }

        requestAnimationFrame(scrollStep);
      }
    }
  }

  function easeOutCubic(t: number): number {
    return --t * t * t + 1;
  }

  function init(): void {
    if (viewMode.value === "desktop") {
      const rdElement: HTMLElement = rdBody.value;
      bodyScrollbar.value = Scrollbar.init(rdElement, {
        damping: 0.05,
      });
      bodyScrollbar.value.setPosition(0, 0);
      bodyScrollbar.value.track.xAxis.element.remove();

      ScrollTrigger.scrollerProxy(rdElement, {
        scrollTop(value) {
          if (arguments.length) bodyScrollbar.value.scrollTop = value;
          return bodyScrollbar.value.scrollTop;
        },
      });

      bodyScrollbar.value.addListener(ScrollTrigger.update);

      ScrollTrigger.defaults({
        scroller: rdElement,
      });
    }
  }

  function reinitialize(): void {
    pageState.value = "idle";
    if (viewMode.value === "desktop") {
      bodyScrollbar.value.destroy();
      setTimeout(() => {
        init();
      }, 250);
    } else {
      window.scrollTo(0, 0);
    }
  }

  watch(
    () => viewMode.value,
    (val, oldVal) => {
      if (val && oldVal) location.reload();
    }
  );

  onBeforeMount(async () => {
    gsap.registerPlugin(ScrollTrigger);
  });

  onMounted(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addEventListener("change", resizeHandler);
    resizeHandler(mediaQuery);

    const event: Event = new Event("resize");
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    window.dispatchEvent(event);

    init();

    setTimeout(() => {
      animate.init(rdHeader.value);
    }, 250);
  });
</script>

<style lang="scss" scoped>
  .rd-layout {
    position: relative;
    width: 100vw;
    height: 100vh;
    height: calc((var(--vh, 1vh) * 100));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    header.rd-header {
      z-index: 10;
      position: fixed;
      width: 100vw;
      height: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a.rd-header-logo {
        position: relative;
        height: 5rem;
        width: 5rem;
        padding: 0 1.75rem;
        text-decoration: none;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        * {
          pointer-events: none;
        }
      }
      .rd-header-navigation {
        position: relative;
        width: 5rem;
        height: 5rem;
        padding: 1.5rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        button.rd-header-navigation-button {
          cursor: pointer;
          position: relative;
          width: 2rem;
          height: 2rem;
          border: none;
          padding: 0;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          .rd-header-navigation-button-bar {
            pointer-events: none;
            position: absolute;
            width: 0;
            height: 1.5px;
            background: var(--font-color);
            &:first-child {
              transform: translateY(-0.125rem) translateX(-0.5rem);
            }
            &:last-child {
              transform: translateY(0.125rem) translateX(0.5rem);
            }
          }
        }
      }
    }
    nav.rd-navigation {
      z-index: 2;
      touch-action: none;
      pointer-events: none;
      z-index: 9;
      position: fixed;
      width: 100vw;
      height: 100vh;
      height: calc((var(--vh, 1vh) * 100));
      opacity: 0;
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--background-secondary-color);
        opacity: 0.5;
      }
      .rd-navigation-overlay {
        position: absolute;
        top: 0;
        right: 0;
        width: 25rem;
        height: 100%;
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        transform: translateX(100%);
      }
      .rd-navigation-container {
        position: relative;
        width: 25rem;
        height: 100%;
        opacity: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        transform: translateX(100%);
        .rd-navigation-placeholder {
          position: relative;
          letter-spacing: 0;
          margin-bottom: 1rem;
        }
        .rd-navigation-header {
          position: relative;
          width: 100%;
          height: 5rem;
          padding: 0 5rem 0 2rem;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span.rd-navigation-name {
            position: relative;
            text-align: right;
            letter-spacing: 0;
            line-height: 1;
            margin: 0;
          }
        }
        .rd-navigation-body {
          position: relative;
          width: 100%;
          padding: 0 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          .rd-navigation-links {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .rd-navigation-links-container {
              position: relative;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              a.rd-navigation-link {
                position: relative;
                line-height: 1;
                text-align: left;
                text-decoration: none;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                * {
                  pointer-events: none;
                }
                > span.rd-text {
                  color: var(--font-color);
                  opacity: 0.25;
                }
                span.rd-text-wrapper {
                  position: absolute;
                  top: 0;
                  left: 0;
                  color: var(--primary-color);
                  span.rd-text-container {
                    transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                    span.rd-text {
                      transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                    }
                  }
                }
                &:hover {
                  span.rd-text-wrapper {
                    span.rd-text-container {
                      transform: translateX(0);
                      span.rd-text {
                        transform: translateX(0);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .rd-navigation-footer {
          position: relative;
          width: 100%;
          padding: 0 2rem 2rem 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          .rd-navigation-placeholder {
            margin-bottom: 0.5rem;
          }
          .rd-navigation-socials {
            position: relative;
            width: 100%;
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .rd-navigation-socials-container {
              position: relative;
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              a.rd-navigation-social {
                position: relative;
                line-height: 1;
                text-align: left;
                text-decoration: none;
                margin-right: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                > span.rd-text {
                  color: var(--font-color);
                  opacity: 0.25;
                }
                span.rd-text-wrapper {
                  position: absolute;
                  top: 0;
                  left: 0;
                  color: var(--primary-color);
                  span.rd-text-container {
                    transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                    span.rd-text {
                      transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                    }
                  }
                }
                &:hover {
                  span.rd-text-wrapper {
                    span.rd-text-container {
                      transform: translateX(0);
                      span.rd-text {
                        transform: translateX(0);
                      }
                    }
                  }
                }
              }
            }
          }
          .rd-navigation-links {
            position: relative;
            width: 100%;
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            a.rd-navigation-link {
              position: relative;
              line-height: 1;
              text-align: left;
              text-decoration: none;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              > span.rd-text {
                color: var(--font-color);
                opacity: 0.25;
              }
              span.rd-text-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                color: var(--primary-color);
                span.rd-text-container {
                  transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                  span.rd-text {
                    transition: transform 0.5s cubic-bezier(0.75, 0, 0.25, 1);
                  }
                }
              }
              &:hover {
                span.rd-text-wrapper {
                  span.rd-text-container {
                    transform: translateX(0);
                    span.rd-text {
                      transform: translateX(0);
                    }
                  }
                }
              }
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    main.rd-body {
      z-index: 1;
      position: relative;
      width: 100%;
      height: 100vh;
      height: calc((var(--vh, 1vh) * 100));
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    @media only screen and (max-width: 1024px) {
      height: auto;
      header.rd-header {
        height: 4rem;
        a.rd-header-logo {
          width: 4rem;
          height: 4rem;
          padding: 0 1.25rem;
        }
        .rd-header-navigation {
          width: 4rem;
          height: 4rem;
          padding: 1rem;
        }
      }
      nav.rd-navigation {
        .rd-navigation-overlay {
          width: 100vw;
        }
        .rd-navigation-container {
          width: 100vw;
          .rd-navigation-header {
            height: 4rem;
            padding: 0 4rem;
            justify-content: flex-end;
          }
          .rd-navigation-body {
            padding: 0 1.5rem;
          }
          .rd-navigation-footer {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
        }
      }
      main.rd-body {
        height: auto;
      }
    }
  }
</style>

<style lang="scss">
  :root {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    --var: 1vh;
    --font-color: #000;
    --primary-color: #6c8b5d;
    --background-color: #fff;
    --background-secondary-color: #fafafa;
  }
  ::selection {
    background: var(--font-color);
  }
  html,
  body {
    font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 24px;
    color: var(--font-color);
    word-spacing: 1px;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    @media only screen and (max-width: 1919px) and (min-width: 1600px) {
      font-size: 22px;
    }
    @media only screen and (max-width: 1599px) and (min-width: 1480px) {
      font-size: 21px;
    }
    @media only screen and (max-width: 1479px) and (min-width: 1380px) {
      font-size: 20px;
    }
    @media only screen and (max-width: 1379px) and (min-width: 1320px) {
      font-size: 19px;
    }
    @media only screen and (max-width: 1319px) and (min-width: 321px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 320px) {
      font-size: 17px;
    }

    @media only screen and (max-width: 1024px) {
      height: auto;
      overflow-y: auto;
    }
  }

  .rd-main-title {
    font-family: "DMSans";
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.125rem;
  }

  .rd-title {
    font-family: "DMSans";
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: calc(-0.25rem / 3);
  }

  .rd-subtitle {
    font-family: "DMSans";
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.0625rem;
  }

  .rd-headline {
    font-family: "DMSans";
    font-size: 1rem;
    font-weight: 500;
  }

  .rd-caption {
    font-family: "DMSans";
    font-size: 0.55rem;
    font-weight: 500;
  }

  .rd-paragraph {
    font-family: "DMSans";
    font-size: 0.65rem;
    font-weight: 400;
    line-height: 1.65;
  }

  .rd-button-text {
    font-family: "DMSans";
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
    line-height: 1;
  }

  span.rd-text-wrapper,
  span.rd-word-wrapper,
  span.rd-image-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    span.rd-text-container,
    span.rd-word-container,
    span.rd-image-container {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      &.rd-text-container-up,
      &.rd-word-container-up,
      &.rd-image-container-up {
        transform: translateY(-100%);
        span.rd-text,
        span.rd-word,
        img.rd-image {
          transform: translateY(100%);
          &.rd-image:not(.rd-image-contain) {
            transform: translateY(100%) scale(1.25);
          }
          &.rd-image-contain {
            object-fit: contain;
            transform: translateY(100%) scale(1);
          }
        }
      }
      &.rd-text-container-down,
      &.rd-word-container-down,
      &.rd-image-container-down {
        transform: translateY(100%);
        span.rd-text,
        span.rd-word,
        img.rd-image {
          transform: translateY(-100%);
          &.rd-image:not(.rd-image-contain) {
            transform: translateY(-100%) scale(1.25);
          }
          &.rd-image-contain {
            object-fit: contain;
            transform: translateY(-100%) scale(1);
          }
        }
      }
      &.rd-text-container-left,
      &.rd-word-container-left,
      &.rd-image-container-left {
        transform: translateX(-100%);
        span.rd-text,
        span.rd-word,
        img.rd-image {
          transform: translateX(100%);
          &.rd-image:not(.rd-image-contain) {
            transform: translateX(100%) scale(1.25);
          }
          &.rd-image-contain {
            object-fit: contain;
            transform: translateX(100%) scale(1);
          }
        }
      }
      &.rd-text-container-right,
      &.rd-word-container-right,
      &.rd-image-container-right {
        transform: translateX(100%);
        span.rd-text,
        span.rd-word,
        img.rd-image {
          transform: translateX(-100%);
          &.rd-image:not(.rd-image-contain) {
            transform: translateX(-100%) scale(1.25);
          }
          &.rd-image-contain {
            object-fit: contain;
            transform: translateX(-100%) scale(1);
          }
        }
      }
    }
  }

  span.rd-image-wrapper {
    width: 100%;
    height: 100%;
    span.rd-image-container {
      width: 100%;
      height: 100%;
      img.rd-image {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.25);
      }
    }
  }

  @media only screen and (max-width: 1479px) {
    .rd-paragraph {
      font-size: 0.75rem;
    }
  }

  @media only screen and (max-width: 1024px) {
    .rd-main-title {
      font-size: 2rem;
    }
    .rd-title {
      font-size: 1.5rem;
    }
    .rd-subtitle {
      font-size: 1.25rem;
    }
    .rd-paragraph {
      font-size: 0.75rem;
    }
  }

  div.rd-layout div.scrollbar-track.scrollbar-track-y {
    width: 11px;
    opacity: 0;
    background: rgba(#fff, 0);
    &:hover,
    &.show {
      opacity: 1;
    }
    &.show > div.scrollbar-thumb::before {
      opacity: 1;
    }
  }

  div.rd-layout div.scrollbar-track.scrollbar-track-y > div.scrollbar-thumb {
    background: transparent;
    cursor: grab;
    width: 100%;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 100%;
      border-radius: 4px;
      background: #000;
      opacity: 0.5;
      transition: opacity 0.25s;
    }
    &:hover::before {
      opacity: 1;
    }
    &:active {
      cursor: grabbing;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }
</style>
