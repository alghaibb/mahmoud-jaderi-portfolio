import { aboutData } from "@/lib/constants";

export default function AboutTimeline() {
  return (
    <div className="py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold">My Journey</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto" />
      </div>

      <div className="relative">
        {/* Timeline Line - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-primary/20" />

        {/* Mobile Timeline Line - Left aligned */}
        <div className="lg:hidden absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20" />

        {/* Timeline Items */}
        <div className="space-y-8 lg:space-y-12">
          {aboutData.timeline.map((item, index) => (
            <div
              key={item.year}
              className={`relative flex items-center ${
                // Mobile: always left-aligned, Desktop: alternating
                index % 2 === 0
                  ? "justify-start lg:justify-start"
                  : "justify-start lg:justify-end"
              }`}
            >
              {/* Year Badge */}
              <div className="absolute left-6 lg:left-1/2 transform lg:-translate-x-1/2 -translate-x-1/2 z-10">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`w-full ml-16 lg:ml-0 lg:w-5/12 p-4 lg:p-6 bg-card rounded-xl border border-border shadow-sm ${
                  // Mobile: no margin, Desktop: alternating margins
                  index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                }`}
              >
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl lg:text-2xl font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
