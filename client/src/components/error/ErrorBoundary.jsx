import React from 'react'

class ErrorBoundary extends React.Component {
   constructor(props){
     super(props);
     this.state= {
       hasError:false,
       error:null,
       errorInfo:null
     }
   }

   static getDerivedStateFromError(){
     return {hasError:true, error};
   }
   componentDidCatch(error, errorInfo){
     console.error("error caught in Error boundary",error);
     this.state=({errorInfo});
   }
   render() {
    if(this.state.hasError){
      return (
     <div className="text-red-600 p-2">
      <h2>Something went wrong</h2>
      <details className='space-y-2 whitespace-pre-wrap'>
        <p> {this.state.error && this.state.error.toString()}</p>
         <p>{this.state.errorInfo?.componentStack}</p>

      </details>
    </div>
      )
    }
    return this.props.children;
   }
   

}

export default ErrorBoundary