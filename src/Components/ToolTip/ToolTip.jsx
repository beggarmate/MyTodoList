import React, { useState } from "react";
import classes from "./ToolTip.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const ToolTip = ({ children, text }) => {
    const [showToolTip, setShowToolTip] = useState(false);
    const [freePositionX, setFreePositionX] = useState("");
    const [freePositionY, setFreePositionY] = useState("");

    function enterTargetHandler(e) {
        const clientHeight = document.documentElement.clientHeight;
        const clientWidth = document.documentElement.clientWidth;
        const positionToolTipY = e.target.getBoundingClientRect().y;
        const positionToolTipX = e.target.getBoundingClientRect().x;

        if (positionToolTipY > clientHeight / 3.5) {
            setFreePositionY("top");
        } else {
            setFreePositionY("bottom");
        }
        if (positionToolTipX > clientWidth / 1.5) {
            setFreePositionX("left");
        } else {
            setFreePositionX("right");
        }

        setShowToolTip(true);
    }

    function leaveTargetHandler() {
        setShowToolTip(false);
    }

    return (
        <div
            className={classes.toolTipWrapper}
            onMouseEnter={enterTargetHandler}
            onMouseLeave={leaveTargetHandler}
            onFocus={enterTargetHandler}
            onBlur={leaveTargetHandler}>
            {children}
            <AnimatePresence>
                {showToolTip && (
                    <motion.div
                        onMouseEnter={() => setShowToolTip(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0.2 } }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className={`${classes.toolTipText} ${classes[freePositionY]} ${classes[freePositionX]}`}>
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToolTip;
