
import React from 'react';

const DashboardFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const version = 'v1.0.0';
  
  return (
    <footer className="border-t py-4 px-6 bg-background text-muted-foreground text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          &copy; {currentYear} ClickGain. All rights reserved.
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="text-xs">{version}</span>
          <span className="mx-2">•</span>
          <span className="text-xs">Build: {new Date().toISOString().slice(0, 10)}</span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
