import { useState } from 'react';
import { useParking } from '../context/ParkingContext';

const Tariffs = () => {
  const { tariff, updateTariff } = useParking();
  const [form, setForm] = useState(tariff);
  const save = (event) => { event.preventDefault(); updateTariff(Object.fromEntries(Object.entries(form).map(([key, value]) => [key, Number(value)]))); };
  return <section className="section"><div className="container parking-page"><div className="page-heading"><div><p className="eyebrow">YÖNETİM</p><h1>Ücret tarifesi</h1></div></div>
    <form className="parking-card tariff-form" onSubmit={save}><p>Çıkış ücreti: taban ücret + dahil süreyi aşan her saat için ek ücret.</p>
      <label htmlFor="baseFee">Taban ücret (₺)</label><input id="baseFee" type="number" min="0" value={form.baseFee} onChange={(event) => setForm({ ...form, baseFee: event.target.value })} />
      <label htmlFor="includedMinutes">Dahil dakika</label><input id="includedMinutes" type="number" min="0" value={form.includedMinutes} onChange={(event) => setForm({ ...form, includedMinutes: event.target.value })} />
      <label htmlFor="hourlyFee">Ek saat ücreti (₺)</label><input id="hourlyFee" type="number" min="0" value={form.hourlyFee} onChange={(event) => setForm({ ...form, hourlyFee: event.target.value })} />
      <button className="btn btn-primary">Tarifeyi kaydet</button>
    </form>
  </div></section>;
};

export default Tariffs;
