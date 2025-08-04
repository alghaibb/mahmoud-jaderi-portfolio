import { aboutData } from "@/lib/constants";

export default function AboutValues() {
  return (
    <div className="py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold">What I Value</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aboutData.values.map((value, index) => (
          <div
            key={value.title}
            className="p-6 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 