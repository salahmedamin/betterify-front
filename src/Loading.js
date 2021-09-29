  
export const Loading = ({style, spinnerStyle, spinnerColor}) => (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: 60, width: 60, ...style }}
    >
      <div className="spinner-border" style={{height:75,width: 75, color: spinnerColor, ...spinnerStyle}}>
      </div>
    </div>
  );