import React from 'react';
function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="copyright">Copyright &copy; {(new Date().getFullYear())}</div>
      </div>
    </div>
  );
}

export default AppFooter;