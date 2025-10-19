import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type SeatStatus = 'available' | 'selected' | 'sold';

interface Seat {
  id: string;
  sector: string;
  price: number;
  status: SeatStatus;
  position: { x: number; y: number };
}

const generateStadiumSeats = (): Seat[] => {
  const seats: Seat[] = [];
  let id = 0;

  // VIP трибуна (верх)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 20; col++) {
      seats.push({
        id: `vip-${id++}`,
        sector: 'VIP',
        price: 3000,
        status: Math.random() > 0.7 ? 'sold' : 'available',
        position: { x: col * 4 + 10, y: row * 4 + 5 }
      });
    }
  }

  // Сектор A (слева)
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 4; col++) {
      seats.push({
        id: `a-${id++}`,
        sector: 'A',
        price: 1500,
        status: Math.random() > 0.65 ? 'sold' : 'available',
        position: { x: col * 4 + 2, y: row * 4 + 20 }
      });
    }
  }

  // Сектор B (справа)
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 4; col++) {
      seats.push({
        id: `b-${id++}`,
        sector: 'B',
        price: 1000,
        status: Math.random() > 0.65 ? 'sold' : 'available',
        position: { x: col * 4 + 78, y: row * 4 + 20 }
      });
    }
  }

  // Сектор C (низ)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 20; col++) {
      seats.push({
        id: `c-${id++}`,
        sector: 'C',
        price: 500,
        status: Math.random() > 0.6 ? 'sold' : 'available',
        position: { x: col * 4 + 10, y: row * 4 + 72 }
      });
    }
  }

  return seats;
};

const Index = () => {
  const [seats, setSeats] = useState<Seat[]>(generateStadiumSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fillAnimation, setFillAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFillAnimation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'sold') return;

    setSeats(prevSeats =>
      prevSeats.map(s =>
        s.id === seat.id
          ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
          : s
      )
    );

    setSelectedSeats(prev => {
      const isSelected = prev.find(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handlePurchase = () => {
    setSeats(prevSeats =>
      prevSeats.map(s =>
        s.status === 'selected' ? { ...s, status: 'sold' } : s
      )
    );
    setSelectedSeats([]);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const totalSeats = seats.length;
  const soldSeats = seats.filter(s => s.status === 'sold').length;
  const fillPercentage = Math.round((soldSeats / totalSeats) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border-2 border-primary rounded-lg p-8 md:p-12 max-w-md mx-4 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Icon name="CheckCircle2" size={48} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold stadium-text text-primary">
                УСПЕШНО!
              </h3>
              <p className="text-lg md:text-xl text-foreground">
                Вы купили билет!
              </p>
              <p className="text-muted-foreground">
                Спасибо за покупку
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Warning */}
      <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm md:text-base font-bold">
        ⚠️ ЭТО ДЕМОНСТРАЦИОННАЯ ВЕРСИЯ - БИЛЕТЫ НЕ ПРОДАЮТСЯ ПО-НАСТОЯЩЕМУ ⚠️
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Icon name="Trophy" size={32} className="text-primary" />
              <h1 className="text-2xl md:text-4xl font-bold stadium-text">СТАДИОН ЛЕГИОН</h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold stadium-text text-primary">
                ЛЕГИОН VS ТИТАН
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} />
                  <span>СУББОТА, 25 ОКТЯБРЯ 2025</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>19:00</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-muted-foreground rounded-full"></div>
                <span className="font-bold">СЕЗОН 2025/26</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Last Match Result */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <span className="text-muted-foreground">Последний матч:</span>
            <span className="font-bold text-primary">ТИТАН победил 5:2</span>
          </div>
        </div>
      </div>

      {/* Stadium Filling Animation */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Заполнение стадиона:</span>
            <div className="flex-1 max-w-md h-4 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-primary stadium-text">{fillPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stadium Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold stadium-text mb-2">СХЕМА СТАДИОНА</h3>
              <p className="text-sm text-muted-foreground">Нажмите на места для выбора</p>
            </div>

            {/* Visual Stadium */}
            <div className="bg-card border-2 border-border rounded-lg p-4 md:p-8 overflow-hidden">
              <svg viewBox="0 0 100 90" className="w-full h-auto">
                {/* Stadium outline */}
                <rect x="1" y="1" width="98" height="88" rx="4" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
                
                {/* Football Field */}
                <rect x="18" y="20" width="64" height="48" rx="2" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                <line x1="50" y1="20" x2="50" y2="68" stroke="hsl(var(--primary))" strokeWidth="0.3" />
                <circle cx="50" cy="44" r="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" />
                <text x="50" y="46" textAnchor="middle" fill="hsl(var(--primary))" fontSize="3" className="stadium-text">ПОЛЕ</text>

                {/* Seats */}
                {seats.map((seat) => (
                  <circle
                    key={seat.id}
                    cx={seat.position.x}
                    cy={seat.position.y}
                    r="1.2"
                    fill={
                      seat.status === 'selected'
                        ? 'hsl(var(--primary))'
                        : seat.status === 'sold'
                        ? 'hsl(var(--muted))'
                        : 'hsl(var(--secondary))'
                    }
                    stroke={
                      seat.status === 'selected'
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--border))'
                    }
                    strokeWidth="0.2"
                    className="cursor-pointer hover:opacity-80 transition-all"
                    onClick={() => handleSeatClick(seat)}
                    style={{
                      opacity: seat.status === 'sold' ? 0.4 : 1,
                      cursor: seat.status === 'sold' ? 'not-allowed' : 'pointer'
                    }}
                  />
                ))}

                {/* Sector Labels */}
                <text x="50" y="12" textAnchor="middle" fill="hsl(var(--primary))" fontSize="2.5" className="stadium-text">VIP 3000₽</text>
                <text x="10" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="2" className="stadium-text" transform="rotate(-90 10 45)">A 1500₽</text>
                <text x="90" y="45" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="2" className="stadium-text" transform="rotate(90 90 45)">B 1000₽</text>
                <text x="50" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="2.5" className="stadium-text">C 500₽</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-secondary border border-border rounded-full"></div>
                <span>Доступно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span>Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted opacity-40 rounded-full"></div>
                <span>Продано</span>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <h3 className="text-xl md:text-2xl font-bold stadium-text mb-6">ВАШИ БИЛЕТЫ</h3>

              {selectedSeats.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Выберите места на схеме стадиона
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedSeats.map(seat => (
                      <div
                        key={seat.id}
                        className="bg-secondary rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-sm">
                            Сектор {seat.sector}
                          </div>
                          <div className="text-primary font-bold text-sm">{seat.price}₽</div>
                        </div>
                        <button
                          onClick={() => handleSeatClick(seat)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Icon name="X" size={20} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Количество:</span>
                      <span className="font-bold text-xl">{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">ИТОГО:</span>
                      <span className="font-bold text-2xl text-primary">{totalPrice}₽</span>
                    </div>

                    <button
                      onClick={handlePurchase}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg stadium-text hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Icon name="ShoppingCart" size={24} />
                      КУПИТЬ БИЛЕТЫ
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      Демо-версия: реальная оплата не производится
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 md:px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            © 2025 СТАДИОН ЛЕГИОН. Демонстрационная версия.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
