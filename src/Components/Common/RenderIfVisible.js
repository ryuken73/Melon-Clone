import useDebounced from 'hooks/useDebounce';

// Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var isServer = typeof window === 'undefined';
var RenderIfVisible = function (_a) {
    var _b = _a.defaultHeight, defaultHeight = _b === void 0 ? 300 : _b, _c = _a.visibleOffset, visibleOffset = _c === void 0 ? 1000 : _c, _d = _a.root, root = _d === void 0 ? null : _d, children = _a.children;
    var _e = React.useState(isServer), isVisible = _e[0], setIsVisible = _e[1];
    var placeholderHeight = React.useRef(defaultHeight);
    var intersectionRef = React.useRef(null);
    const [intersected, setIntersected] = React.useState(false);
    // Set visibility with intersection observer
    const intersectingDebounced = useDebounced(intersected, 0);
    React.useEffect(() => {
        if (typeof window !== undefined && window.requestIdleCallback) {
            window.requestIdleCallback(function () { 
                console.log('**setIsVisible idleCallback:', intersectingDebounced)
                // return setIsVisible(entries[0].isIntersecting); 
                return setIsVisible(intersectingDebounced);
            }, {
                timeout: 500
            });
        }
        else {
            // setIsVisible(entries[0].isIntersecting);
            setIsVisible(intersectingDebounced)
        }
    },[intersectingDebounced, setIsVisible])
    React.useEffect(function () {
        if (intersectionRef.current) {
            var observer_1 = new IntersectionObserver(function (entries) {
                setIntersected(entries[0].isIntersecting);
            }, { root: root, rootMargin: visibleOffset + "px 0px " + visibleOffset + "px 0px" });
            observer_1.observe(intersectionRef.current);
            return function () {
                if (intersectionRef.current) {
                    observer_1.unobserve(intersectionRef.current);
                }
            };
        }
        return function () { };
    }, [intersectionRef]);
    // Set true height for placeholder element after render.
    React.useEffect(function () {
        if (intersectionRef.current && isVisible) {
            placeholderHeight.current = intersectionRef.current.offsetHeight;
        }
    }, [isVisible, intersectionRef]);
    return (React__default.createElement("div", { ref: intersectionRef }, isVisible ? (React__default.createElement(React__default.Fragment, null, children)) : (React__default.createElement("div", { style: { height: placeholderHeight.current } }))));
};

// exports.default = RenderIfVisible;
export default RenderIfVisible;
//# sourceMappingURL=index.js.map
