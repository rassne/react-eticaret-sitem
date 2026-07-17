import { useParking } from '../context/ParkingContext';

const time = (value) => new Date(value).toLocaleString('tr-TR');

const ParkingOperations = () => {
  const { sessions, events, reviews, markPaid, resolveReview } = useParking();
  const active = sessions.filter((session) => session.status === 'active');

  return <section className="section"><div className="container parking-page">
    <div className="page-heading"><div><p className="eyebrow">OPERASYON</p><h1>Araçlar ve olaylar</h1></div></div>
    <div className="parking-card table-wrap"><h2>Parktaki araçlar</h2>
      <table><thead><tr><th>Plaka</th><th>Giriş</th><th>Kamera</th><th>Durum</th></tr></thead><tbody>
        {active.length ? active.map((session) => <tr key={session.id}><td><strong>{session.plate}</strong></td><td>{time(session.enteredAt)}</td><td>{session.entryCameraId}</td><td><span className="pill active">Parkta</span></td></tr>) : <tr><td colSpan="4">Aktif araç yok.</td></tr>}
      </tbody></table>
    </div>
    <div className="parking-card table-wrap"><h2>Tamamlanan parklar</h2>
      <table><thead><tr><th>Plaka</th><th>Süre</th><th>Tutar</th><th>Ödeme</th></tr></thead><tbody>
        {sessions.filter((session) => session.status === 'completed').map((session) => <tr key={session.id}><td>{session.plate}</td><td>{session.durationMinutes} dk</td><td>{session.amount} ₺</td><td>{session.paymentStatus === 'paid' ? <span className="pill paid">Ödendi</span> : <button className="text-button" onClick={() => markPaid(session.id)}>Ödemeyi al</button>}</td></tr>)}
      </tbody></table>
    </div>
    <div className="parking-card"><h2>Görevli incelemesi</h2>
      {!reviews.filter((review) => review.status === 'pending').length && <p>Bekleyen inceleme yok.</p>}
      {reviews.filter((review) => review.status === 'pending').map((review) => <div className="review-row" key={review.id}><div><strong>{review.plate || 'Okunamadı'}</strong><small>{review.reason} · {review.cameraId} · %{Math.round(review.confidence * 100)}</small></div><div><button className="btn btn-small btn-secondary" onClick={() => resolveReview(review.id, 'rejected')}>Reddet</button><button className="btn btn-small btn-primary" onClick={() => resolveReview(review.id, 'approved')}>Onayla</button></div></div>)}
    </div>
    <div className="parking-card table-wrap"><h2>Son kamera olayları</h2><table><thead><tr><th>Zaman</th><th>Plaka</th><th>Yön</th><th>Kamera</th><th>Güven</th></tr></thead><tbody>{events.slice(0, 10).map((event) => <tr key={event.id}><td>{time(event.occurredAt)}</td><td>{event.plate}</td><td>{event.direction === 'entry' ? 'Giriş' : 'Çıkış'}</td><td>{event.cameraId}</td><td>%{Math.round(event.confidence * 100)}</td></tr>)}</tbody></table></div>
  </div></section>;
};

export default ParkingOperations;
