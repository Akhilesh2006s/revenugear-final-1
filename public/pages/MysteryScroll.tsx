"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const MysteryScroll = () => {
  useEffect(() => {
    const numLines = 10;
    const angle = 360 / numLines;
    const fontSize = 4; // matches --fontSize in CSS
    let radius = 0;
    let origin = "";

    const cloneNode = () => {
      const tubeInner = document.querySelector(".tube__inner");
      const firstLine = document.querySelector(".line");
      if (!firstLine || !tubeInner) return;

      for (let i = 1; i < numLines; i++) {
        const clone = firstLine.cloneNode(true) as HTMLElement;
        clone.classList.add(`line--${i + 1}`);
        tubeInner.appendChild(clone);
      }
      firstLine.classList.add("line--1");
    };

    const set3D = () => {
      const width = window.innerWidth;
      const fontSizePx = (width / 100) * fontSize;
      radius = (fontSizePx / 2) / Math.sin((180 / numLines) * (Math.PI / 180));
      origin = `50% 50% -${radius}px`;
    };

    const positionText = () => {
      gsap.set(".line", {
        rotationX: (i: number) => -angle * i,
        z: radius,
        transformOrigin: origin,
      });
    };

    const updateStyles = (targets: gsap.TweenTarget) => {
      targets.forEach((el: HTMLElement) => {
        const deg = gsap.getProperty(el, "rotateX") as number;
        const rad = deg * (Math.PI / 180);
        const conversion = Math.abs(Math.cos(rad) / 2 + 0.5);
        const fontW = 200 + 700 * conversion;
        const fontS = `${100 + 700 * conversion}%`;

        gsap.set(el, {
          opacity: conversion + 0.1,
          fontWeight: fontW,
          fontStretch: fontS,
        });
      });
    };

    const initScroll = () => {
      gsap.to(".line", {
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          scrub: 1,
        },
        rotateX: "+=1080",
        onUpdate() {
          updateStyles(this.targets() as HTMLElement[]);
        },
      });
    };

    const init = () => {
      cloneNode();
      set3D();
      positionText();
      updateStyles(gsap.utils.toArray(".line"));
      initScroll();
      gsap.to(".stage", { autoAlpha: 1, duration: 1 });
    };

    init();
    window.addEventListener("resize", () => {
      set3D();
      positionText();
    });
  }, []);

  return (
    <div className="scroll-container">
      <div className="stage">
        <div className="tube">
          <div className="tube__inner">
            <h1 className="line">Mystery</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryScroll;
