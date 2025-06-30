import { useNavigate } from "react-router-dom";

const FloatingCart = ({ cart }) => {
  const navigate = useNavigate();

  return (
    <div className="floating-cart" onClick={() => navigate("/cart")}>
      🏡
      {Object.keys(cart).length > 0 && (
        <span className="cart-badge">
          {Object.values(cart).reduce((a, b) => a + b, 0)}
        </span>
      )}
    </div>
  );
};

export default FloatingCart;
