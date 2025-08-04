import { aboutData } from "@/lib/constants";

export default function AboutTimeline() {
  return (
    <div className="py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold">My Journey</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto" />
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-primary/20" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {aboutData.timeline.map((item, index) => (
            <div
              key={item.year}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Year Badge */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`w-5/12 p-6 bg-card rounded-xl border border-border shadow-sm ${
                  index % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
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