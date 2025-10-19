import { useState } from 'react';
import Icon from '@/components/ui/icon';

type SeatStatus = 'available' | 'selected' | 'sold';

interface Seat {
  id: string;
  row: number;
  number: number;
  sector: string;
  price: number;
  status: SeatStatus;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const sectors = [
    { name: 'VIP', rows: 3, seatsPerRow: 10, price: 3000 },
    { name: 'A', rows: 8, seatsPerRow: 15, price: 1500 },
    { name: 'B', rows: 8, seatsPerRow: 15, price: 1000 },
    { name: 'C', rows: 10, seatsPerRow: 20, price: 500 },
  ];

  sectors.forEach(sector => {
    for (let row = 1; row <= sector.rows; row++) {
      for (let seat = 1; seat <= sector.seatsPerRow; seat++) {
        const randomSold = Math.random() > 0.7;
        seats.push({
          id: `${sector.name}-${row}-${seat}`,
          row,
          number: seat,
          sector: sector.name,
          price: sector.price,
          status: randomSold ? 'sold' : 'available'
        });
      }
    }
  });

  return seats;
};

const Index = () => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

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

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const getSectorSeats = (sectorName: string) => {
    return seats.filter(seat => seat.sector === sectorName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Demo Warning */}
      <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm md:text-base font-bold">
        ⚠️ ЭТО ДЕМОНСТРАЦИОННАЯ ВЕРСИЯ - БИЛЕТЫ НЕ ПРОДАЮТСЯ ПО-НАСТОЯЩЕМУ ⚠️
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Icon name="Stadium" size={32} className="text-primary" />
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stadium Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold stadium-text mb-2">СХЕМА СТАДИОНА</h3>
              <p className="text-sm text-muted-foreground">Выберите места на стадионе</p>
            </div>

            {/* Football Field */}
            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-3 md:p-4 mb-6">
                <div className="text-center text-xs md:text-sm font-bold text-primary stadium-text">
                  ФУТБОЛЬНОЕ ПОЛЕ
                </div>
              </div>

              {/* VIP Sector */}
              <div className="mb-6">
                <h4 className="text-sm md:text-base font-bold mb-3 stadium-text text-primary">
                  VIP СЕКТОР - 3000₽
                </h4>
                <div className="grid grid-cols-10 gap-1 md:gap-2">
                  {getSectorSeats('VIP').map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'sold'}
                      className={`aspect-square rounded text-xs md:text-sm font-bold transition-all ${
                        seat.status === 'available'
                          ? 'bg-primary/20 hover:bg-primary/40 border border-primary cursor-pointer'
                          : seat.status === 'selected'
                          ? 'bg-primary text-primary-foreground border-2 border-primary scale-110'
                          : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                      }`}
                      title={`${seat.sector}-${seat.row}-${seat.number}`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector A */}
              <div className="mb-6">
                <h4 className="text-sm md:text-base font-bold mb-3 stadium-text">СЕКТОР A - 1500₽</h4>
                <div className="grid grid-cols-15 gap-1">
                  {getSectorSeats('A').slice(0, 45).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'sold'}
                      className={`aspect-square rounded text-[10px] md:text-xs font-bold transition-all ${
                        seat.status === 'available'
                          ? 'bg-secondary hover:bg-secondary/70 border border-border cursor-pointer'
                          : seat.status === 'selected'
                          ? 'bg-primary text-primary-foreground border-2 border-primary scale-110'
                          : 'bg-muted text-muted-foreground cursor-not-allowed opacity-30'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector B */}
              <div className="mb-6">
                <h4 className="text-sm md:text-base font-bold mb-3 stadium-text">СЕКТОР B - 1000₽</h4>
                <div className="grid grid-cols-15 gap-1">
                  {getSectorSeats('B').slice(0, 45).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'sold'}
                      className={`aspect-square rounded text-[10px] md:text-xs font-bold transition-all ${
                        seat.status === 'available'
                          ? 'bg-secondary hover:bg-secondary/70 border border-border cursor-pointer'
                          : seat.status === 'selected'
                          ? 'bg-primary text-primary-foreground border-2 border-primary scale-110'
                          : 'bg-muted text-muted-foreground cursor-not-allowed opacity-30'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector C */}
              <div>
                <h4 className="text-sm md:text-base font-bold mb-3 stadium-text">СЕКТОР C - 500₽</h4>
                <div className="grid grid-cols-20 gap-1">
                  {getSectorSeats('C').slice(0, 60).map(seat => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'sold'}
                      className={`aspect-square rounded text-[8px] md:text-[10px] font-bold transition-all ${
                        seat.status === 'available'
                          ? 'bg-secondary hover:bg-secondary/70 border border-border cursor-pointer'
                          : seat.status === 'selected'
                          ? 'bg-primary text-primary-foreground border-2 border-primary scale-110'
                          : 'bg-muted text-muted-foreground cursor-not-allowed opacity-30'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary border border-border rounded"></div>
                <span>Доступно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded"></div>
                <span>Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-muted opacity-50 rounded"></div>
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
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedSeats.map(seat => (
                      <div
                        key={seat.id}
                        className="bg-secondary rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-sm">
                            {seat.sector} Ряд {seat.row} Место {seat.number}
                          </div>
                          <div className="text-primary font-bold text-sm">{seat.price}₽</div>
                        </div>
                        <button
                          onClick={() => handleSeatClick(seat)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Icon name="X" size={20} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Количество билетов:</span>
                      <span className="font-bold text-xl">{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">ИТОГО:</span>
                      <span className="font-bold text-2xl text-primary">{totalPrice}₽</span>
                    </div>

                    <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg stadium-text hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
