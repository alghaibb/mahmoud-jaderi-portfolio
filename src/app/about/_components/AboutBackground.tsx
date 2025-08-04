import { aboutData } from "@/lib/constants";

export default function AboutBackground() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold">My Journey</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-muted-foreground">
            I&apos;m a passionate full-stack developer based in {aboutData.background.location}, 
            with {aboutData.background.experience} of experience building modern web applications. 
            My journey began with curiosity about how websites work, which led me to explore 
            pre-made templates before realizing I wanted full control over my creations.
          </p>
          <p className="text-muted-foreground">
            {aboutData.background.motivation}
          </p>
          <p className="text-muted-foreground">
            I completed a {aboutData.expertise.certification} and have been continuously 
            learning and growing ever since. My approach combines formal education with 
            hands-on experience, allowing me to build robust, scalable applications that 
            solve real-world problems.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold">What I Do</h3>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I specialize in {aboutData.expertise.preferred}, creating seamless experiences 
            that blend frontend and backend technologies. My expertise includes:
          </p>
          <ul className="space-y-3">
            {aboutData.expertise.stack.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 