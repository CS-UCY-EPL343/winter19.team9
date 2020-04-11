import { useEffect } from "react";
// noinspection ES6CheckImport
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // noinspection JSConstructorReturnsPrimitive
    return null;
};

export default ScrollToTop;
