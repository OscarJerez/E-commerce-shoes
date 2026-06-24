import React, { useState } from 'react';
import { Product } from '../data/products';
import './Checkout.css';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
}

type DeliveryType = 'standard' | 'express';
type DeliveryCompany = 'postnord' | 'dhl' | 'gls' | 'instabox';

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  deliveryType: DeliveryType;
  deliveryCompany: DeliveryCompany;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBackToCart }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState<OrderData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    deliveryType: 'standard',
    deliveryCompany: 'postnord',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.deliveryType === 'express' ? 99 : 49;
  const total = subtotal + deliveryFee;

  const deliveryCompanies = {
    postnord: 'PostNord',
    dhl: 'DHL',
    gls: 'GLS',
    instabox: 'Instabox',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.zipCode &&
      formData.city
    ) {
      setStep('payment');
    } else {
      alert('Vänligen fyll i alla fält');
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Stripe payment
    setTimeout(() => {
      // Generate fake order number
      const orderNum = 'ORD-' + Date.now().toString().slice(-8);
      setOrderNumber(orderNum);
      setStep('confirmation');
      setLoading(false);
    }, 2000);
  };

  if (step === 'confirmation') {
    return (
      <div className="checkout-container">
        <div className="confirmation-box">
          <div className="confirmation-icon">✅</div>
          <h2>Beställning bekräftad!</h2>
          <p className="order-number">Ordernummer: <strong>{orderNumber}</strong></p>
          <div className="confirmation-details">
            <div className="detail-group">
              <h3>Leveransadress</h3>
              <p>
                {formData.firstName} {formData.lastName}<br />
                {formData.address}<br />
                {formData.zipCode} {formData.city}
              </p>
            </div>
            <div className="detail-group">
              <h3>Leverans</h3>
              <p>
                {formData.deliveryType === 'express' ? 'Snabb leverans' : 'Vanlig leverans'} via {deliveryCompanies[formData.deliveryCompany]}
              </p>
            </div>
            <div className="detail-group">
              <h3>Totalsumma</h3>
              <p className="total-price">{total} kr</p>
            </div>
          </div>
          <p className="confirmation-message">
            Du kommer att få ett bekräftelsemail på {formData.email} inom en minut.
          </p>
          <button className="continue-btn" onClick={onBackToCart}>
            Tillbaka till butiken
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          {step === 'shipping' && (
            <>
              <h2>1. Leveransadress</h2>
              <form onSubmit={handleSubmitShipping}>
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Förnamn"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Efternamn"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-postadress"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefonnummer"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Gatuadress"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Postnummer"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stad"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <h3 style={{ marginTop: '30px' }}>Leveranssätt</h3>
                <div className="delivery-options">
                  <label className="delivery-option">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="standard"
                      checked={formData.deliveryType === 'standard'}
                      onChange={handleInputChange}
                    />
                    <span>
                      <strong>Vanlig leverans</strong> (3-5 arbetsdagar)
                      <br />
                      <small>Frakt: 49 kr</small>
                    </span>
                  </label>
                  <label className="delivery-option">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="express"
                      checked={formData.deliveryType === 'express'}
                      onChange={handleInputChange}
                    />
                    <span>
                      <strong>Snabb leverans</strong> (1-2 arbetsdagar)
                      <br />
                      <small>Frakt: 99 kr</small>
                    </span>
                  </label>
                </div>

                <h3 style={{ marginTop: '30px' }}>Leverantör</h3>
                <select name="deliveryCompany" value={formData.deliveryCompany} onChange={handleInputChange}>
                  <option value="postnord">📮 PostNord</option>
                  <option value="dhl">📦 DHL</option>
                  <option value="gls">📫 GLS</option>
                  <option value="instabox">🔒 Instabox</option>
                </select>

                <button type="submit" className="next-btn">
                  Nästa →
                </button>
              </form>
            </>
          )}

          {step === 'payment' && (
            <>
              <h2>2. Betalning</h2>
              <form onSubmit={handleSubmitPayment}>
                <div className="payment-methods">
                  <p className="payment-title">Betalningsmetod: Kreditkort (Mock Stripe)</p>
                </div>

                <h3>Kortuppgifter</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Kortnummer (t.ex. 4242 4242 4242 4242)"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/ÅÅ"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    maxLength="5"
                    required
                  />
                  <input
                    type="text"
                    name="cardCVC"
                    placeholder="CVC"
                    value={formData.cardCVC}
                    onChange={handleInputChange}
                    maxLength="4"
                    required
                  />
                </div>

                <div className="payment-info">
                  <p className="test-card">
                    💳 Test-kort: 4242 4242 4242 4242 (MM/ÅÅ: Vilket som helst, CVC: Vilket som helst)
                  </p>
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => setStep('shipping')}
                  >
                    ← Tillbaka
                  </button>
                  <button
                    type="submit"
                    className="pay-btn"
                    disabled={loading}
                  >
                    {loading ? 'Bearbetar...' : `Betala ${total} kr`}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <div className="order-summary">
          <h3>Ordersammanfattning</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x{item.quantity}</span>
                <span>{item.price * item.quantity} kr</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{subtotal} kr</span>
          </div>
          <div className="summary-row">
            <span>Frakt ({formData.deliveryType === 'express' ? 'Snabb' : 'Vanlig'}):</span>
            <span>{deliveryFee} kr</span>
          </div>
          <div className="summary-row total">
            <span>TOTALT:</span>
            <span>{total} kr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
