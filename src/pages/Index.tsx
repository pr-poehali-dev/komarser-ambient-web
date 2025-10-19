import { useState } from 'react';
import Icon from '@/components/ui/icon';

const tracks = [
  { id: 1, title: 'sad day', duration: '2:38', year: '2024' },
  { id: 2, title: 'Los Santos', duration: '2:22', year: '2024' },
  { id: 3, title: 'Lonely', duration: '4:00', year: '2024' },
  { id: 4, title: 'Worringly', duration: '2:17', year: '2023' },
  { id: 5, title: 'Wait me', duration: '2:13', year: '2023' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'music'>('home');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold cinematic-text tracking-wider">KOMARSER</h1>
          <div className="flex gap-4 md:gap-8">
            <button
              onClick={() => setActiveSection('home')}
              className={`cinematic-text text-xs md:text-sm transition-colors ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ГЛАВНАЯ
            </button>
            <button
              onClick={() => setActiveSection('music')}
              className={`cinematic-text text-xs md:text-sm transition-colors ${
                activeSection === 'music' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              МУЗЫКА
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-24 animate-fade-in">
          <div className="max-w-5xl w-full">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-light cinematic-text tracking-tight leading-tight">
                  KOMARSER
                </h2>
                <div className="h-px w-20 md:w-32 bg-primary"></div>
              </div>
              
              <p className="text-sm sm:text-base md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                Амбиент-артист, исследующий границы звука и кино. 
                Создаю атмосферные саундскейпы и стремлюсь к актёрскому мастерству.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name="Music" size={20} className="text-primary" />
                    <span className="cinematic-text text-xs md:text-sm text-muted-foreground">МУЗЫКАНТ</span>
                  </div>
                  <p className="text-sm md:text-base text-foreground font-light">Амбиент / Экспериментал</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon name="Film" size={20} className="text-primary" />
                    <span className="cinematic-text text-xs md:text-sm text-muted-foreground">АКТЁР</span>
                  </div>
                  <p className="text-sm md:text-base text-foreground font-light">Начинающий исполнитель</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Music Section */}
      {activeSection === 'music' && (
        <section className="min-h-screen px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 md:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold cinematic-text mb-4">МУЗЫКА</h2>
              <div className="h-px w-16 md:w-24 bg-primary"></div>
            </div>

            <div className="space-y-1">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="group border-b border-border/50 py-4 md:py-6 hover:bg-secondary/30 transition-all duration-300 px-4 md:px-6 -mx-4 md:-mx-6"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fade-in 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-6 flex-1">
                      <span className="text-muted-foreground font-light text-xs md:text-sm w-6 md:w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-xl md:text-2xl font-light group-hover:text-primary transition-colors">
                          {track.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-8 text-muted-foreground">
                      <span className="font-light text-xs md:text-sm hidden sm:block">{track.year} г.</span>
                      <span className="font-light tabular-nums text-sm md:text-base">{track.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs md:text-sm font-light text-center md:text-left">
            © 2024 KOMARSER. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Youtube" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Mail" size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;