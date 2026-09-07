"use client";

import { RefObject, useEffect } from "react";

export function useKeyboardScrollFix(elementRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const viewport = typeof window !== "undefined" ? window.visualViewport : null;
        if (!viewport) return;

        const handleResize = () => {
            const keyboardHeight = Math.max(window.innerHeight - viewport.height - viewport.offsetTop, 0);
            document.body.style.paddingBottom = keyboardHeight > 60 ? `${keyboardHeight}px` : "";

            if (keyboardHeight > 60 && elementRef.current) {
                elementRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        };

        viewport.addEventListener("resize", handleResize);
        return () => {
            viewport.removeEventListener("resize", handleResize);
            document.body.style.paddingBottom = "";
        };
    }, [elementRef]);
}
