'use client'
import React, { useEffect, useState } from 'react';
import {motion, useAnimation, useInView} from 'framer-motion';

const CounterEffect = ({target, duration}) => {
    const [count, setCount] = useState(0)
    const ref = React.useRef(null)
    const inView = useInView(ref)
    const controls = useAnimation();
    // console.log(count, target, duration, "why")
    useEffect(() =>{
        if(inView){
            let startTime;
            const updateCount = (time) =>{
                if(!startTime){
                    startTime = time
                }
                const progress = Math.min((time - startTime) / (duration * 1000), 1)
                setCount(Math.floor(target * progress))
                if(progress < 1){
                    requestAnimationFrame(updateCount)
                }
            }
            requestAnimationFrame(updateCount);
            controls.start({scale: 1, opacity: 1})
        }
    },[inView, target, duration, controls])
    return (
        <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="text-4xl md:text-5xl font-bold mb-2"
    >
      {count}+
    </motion.div>
    );
};

export default CounterEffect;