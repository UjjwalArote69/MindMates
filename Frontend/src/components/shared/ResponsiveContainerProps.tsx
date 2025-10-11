interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer = ({ children, className = "" }: ResponsiveContainerProps) => {
  return (
    <div className={`w-full mx-auto ${className}`}>
      {/* Mobile: full width, Tablet: 640px, Desktop: 768px, Large: 1024px max */}
      <div className="w-full md:max-w-[640px] lg:max-w-[768px] xl:max-w-[1024px] mx-auto">
        {children}
      </div>
    </div>
  );
};