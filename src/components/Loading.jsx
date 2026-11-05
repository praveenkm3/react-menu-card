function Loading(props){
  return(
    <div className="loading-indicator">
      <span className="spinner"></span>
      <p className="loading-text">{props.label || "Loading..."}</p>
    </div>
  );
}

export default Loading;
