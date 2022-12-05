import React from 'react';

function DashboardPage() {
  return (
    <>
      <div className="page dashboard">
        <p>
          The Insights Agent is now running. By closing this window, you will not pause the study.
        </p>

        <p>
          If you are having trouble or have any questions, please contact tech4all@buildjustly.org.
        </p>

        <p>
          If you would like to opt out of this study, click the Pause button in the taskbar and follow instructions.
        </p>
      </div>

      <button className="close" onClick={window.close}>Close</button>
    </>
  )
}

export default DashboardPage;
