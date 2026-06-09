import { useRef,useEffect } from 'react'

function ScrollView({children,className="", dependency}) {
    const scrollView= useRef(null);


    useEffect(() => {
      const container= scrollView.current;

      if(!container) return;

      requestAnimationFrame(()=>{
        container.scrollTop= container.scrollHeight;
      })
    
    }, [dependency])
    
  return (
    <div ref={scrollView} className={`h-full overflow-y-auto scroll-smooth ${className}`}>{children}</div>
  )
}

export default ScrollView