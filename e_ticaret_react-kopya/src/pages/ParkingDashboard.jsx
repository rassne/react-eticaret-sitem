import { useState } from 'react';
import { useParking } from '../context/ParkingContext';

const cameras = [
  { id: 'ENTRY-01', name: 'Ana Giriş', direction: 'entry' },
  { id: 'EXIT-01', name: 'Ana Çıkış', direction: 'exit' }
];

const ParkingDashboard = () => {
  const { sessions, submitReading } = useParking();
  const [form, setForm] = useState({ plate: '', direction: 'entry', cameraId: 'ENTRY-01', confidence: '0.95', photoRef: '' });
  const [notice, setNotice] = useState('');
  const activeCount = sessions.filter((session) => session.status === 'active').length;

  const submit = (event) => {
    event.preventDefault();
    const result = submitReading(form);
    const messages = { entered: 'Giriş kaydı oluşturuldu.', exited: `Çıkış kaydedildi. Tutar: ${result.session.amount} ₺`, review: 'Okuma görevli onayına gönderildi.', duplicate: 'Tekrarlanan kare yoksayıldı.' };
    setNotice(messages[result.outcome]);
    setForm((current) => ({ ...current, plate: '', photoRef: '' }));
  };

  const changeDirection = (direction) => {
    const camera = cameras.find((item) => item.direction === direction);
    setForm((current) => ({ ...current, direction, cameraId: camera.id }));
  };

  return (
    <section className="section"><div className="container parking-page">
      <div className="page-heading"><div><p className="eyebrow">CANLI OPERASYON</p><h1>Otopark Kontrol Paneli</h1></div><span className="camera-status">● Kameralar çevrimiçi</span></div>
      <div className="metric-grid">
        <article className="metric"><span>Aktif araç</span><strong>{activeCount}</strong></article>
        <article className="metric"><span>Bugün tamamlanan</span><strong>{sessions.filter((session) => session.status === 'completed').length}</strong></article>
        <article className="metric"><span>Bekleyen ödeme</span><strong>{sessions.filter((session) => session.paymentStatus === 'pending').length}</strong></article>
      </div>
      <div className="dashboard-grid">
        <form className="parking-card reading-form" onSubmit={submit}>
          <h2>Plaka okuma olayı</h2>
          <p>Kamera/OCR istemcisinin gönderdiği kaydı simüle eder.</p>
          <label>Yön</label><div className="direction-toggle">
            <button type="button" className={form.direction === 'entry' ? 'selected' : ''} onClick={() => changeDirection('entry')}>Giriş</button>
            <button type="button" className={form.direction === 'exit' ? 'selected' : ''} onClick={() => changeDirection('exit')}>Çıkış</button>
          </div>
          <label htmlFor="plate">Plaka</label><input id="plate" required value={form.plate} onChange={(event) => setForm({ ...form, plate: event.target.value })} placeholder="34 ABC 123" />
          <label htmlFor="confidence">OCR güveni (0–1)</label><input id="confidence" type="number" min="0" max="1" step="0.01" required value={form.confidence} onChange={(event) => setForm({ ...form, confidence: event.target.value })} />
          <label htmlFor="photoRef">Görüntü referansı</label><input id="photoRef" value={form.photoRef} onChange={(event) => setForm({ ...form, photoRef: event.target.value })} placeholder="camera://entry/frame-123.jpg" />
          <input type="hidden" value={form.cameraId} />
          <button className="btn btn-primary" type="submit">Olayı kaydet</button>
          {notice && <p className="notice" role="status">{notice}</p>}
        </form>
        <article className="parking-card"><h2>Kamera envanteri</h2>{cameras.map((camera) => <div className="camera-row" key={camera.id}><span className="camera-dot">●</span><div><strong>{camera.name}</strong><small>{camera.id} · {camera.direction === 'entry' ? 'Giriş' : 'Çıkış'}</small></div><span>Çevrimiçi</span></div>)}
          <hr /><h3>OCR eşik değeri</h3><p>Güveni %80&apos;in altındaki veya geçersiz biçimli plakalar otomatik işlenmez; görevli incelemesine alınır.</p>
        </article>
      </div>
    </div></section>
  );
};

export default ParkingDashboard;
