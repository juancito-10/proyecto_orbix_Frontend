import { useState } from "react";
import { Search, ChevronUp, ChevronDown, Minus, X } from "lucide-react";
import "../../components/dashboardInventario/ModalInventario.css";
import "./MovimientosInventario.css";

const initialMovData = [
  { id: "MOV-0048", fecha: "30 Jul 2026", hora: "09:14", tipo: "Entrada", producto: "Laptop Lenovo IdeaPad 5", sku: "PRD-001", cantidad: "+10 u.", isPositive: true, valor: 84500, responsable: "Luis Herrera", nota: "Reposición mensual" },
  { id: "MOV-0047", fecha: "30 Jul 2026", hora: "08:32", tipo: "Salida", producto: "Smartphone Samsung Galaxy A55", sku: "PRD-005", cantidad: "+3 u.", isPositive: true, valor: 17700, responsable: "Ana Torres", nota: "ORD-2843" },
  { id: "MOV-0046", fecha: "29 Jul 2026", hora: "16:55", tipo: "Salida", producto: "Monitor Samsung 27\" FHD", sku: "PRD-002", cantidad: "+2 u.", isPositive: true, valor: 6400, responsable: "Diego Ruiz", nota: "ORD-2846" },
  { id: "MOV-0045", fecha: "29 Jul 2026", hora: "14:20", tipo: "Ajuste", producto: "Zapatillas Nike Air Max 270", sku: "PRD-003", cantidad: "-4 u.", isPositive: false, valor: 7560, responsable: "Luis Herrera", nota: "Conteo físico - diferen..." }
];

const types = ["Todos", "Entrada", "Salida", "Ajuste"];

const MovimientosInventario = () => {
  const [movimientos, setMovimientos] = useState(initialMovData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");

  // Estado del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Entrada" | "Salida">("Entrada");
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    producto: "",
    sku: "",
    cantidad: "",
    valor: "",
    responsable: "Luis Herrera",
    nota: ""
  });

  // Lógica de filtrado
  const filteredMovs = movimientos.filter((mov) => {
    const matchesSearch =
      mov.producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mov.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "Todos" || mov.tipo === selectedType;

    return matchesSearch && matchesType;
  });

  const abrirModal = (tipo: "Entrada" | "Salida") => {
    setModalType(tipo);
    setIsModalOpen(true);
  };

  const handleRegistrarMovimiento = (e: React.FormEvent) => {
    e.preventDefault();
    const isEntrada = modalType === "Entrada";
    const signo = isEntrada ? "+" : "-";
    
    const movNuevo = {
      id: `MOV-00${movimientos.length + 45}`,
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      tipo: modalType,
      producto: nuevoMovimiento.producto,
      sku: nuevoMovimiento.sku || "PRD-XXX",
      cantidad: `${signo}${nuevoMovimiento.cantidad} u.`,
      isPositive: isEntrada, // o si quieren que salida sea positivo en verde como la imagen
      valor: Number(nuevoMovimiento.valor),
      responsable: nuevoMovimiento.responsable,
      nota: nuevoMovimiento.nota
    };

    setMovimientos([movNuevo, ...movimientos]);
    setIsModalOpen(false);
    
    // Resetear form
    setNuevoMovimiento({ producto: "", sku: "", cantidad: "", valor: "", responsable: "Luis Herrera", nota: "" });
  };

  // Calcular métricas
  const totalEntradas = movimientos.filter(m => m.tipo === "Entrada").reduce((acc, curr) => acc + curr.valor, 0);
  const totalSalidas = movimientos.filter(m => m.tipo === "Salida").reduce((acc, curr) => acc + curr.valor, 0);
  const cantEntradas = movimientos.filter(m => m.tipo === "Entrada").length;
  const cantSalidas = movimientos.filter(m => m.tipo === "Salida").length;

  return (
    <>
      <div className="mov-header">
        <div className="mov-title">
          <h2>Movimientos de inventario</h2>
          <p>Registro de entradas, salidas y ajustes de stock</p>
        </div>
        <div className="mov-actions">
          <button className="btn-outline" onClick={() => abrirModal("Entrada")}>
            <ChevronUp size={18} /> Registrar entrada
          </button>
          <button className="btn-primary" onClick={() => abrirModal("Salida")}>
            <ChevronDown size={18} /> Registrar salida
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot blue"></div>
            <p>Movimientos registrados</p>
          </div>
          <h3>{movimientos.length}</h3>
          <p className="subtitle text-gray">últimos 7 días</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot green"></div>
            <p>Total entradas</p>
          </div>
          <h3>$ {totalEntradas.toLocaleString('es-AR')}</h3>
          <p className="subtitle text-green">{cantEntradas} operaciones</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <div className="dot red"></div>
            <p>Total salidas</p>
          </div>
          <h3>$ {totalSalidas.toLocaleString('es-AR')}</h3>
          <p className="subtitle text-red">{cantSalidas} operaciones</p>
        </div>
      </div>
      
      <div className="filters-bar">
        <div className="search-input">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Buscar producto o ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-pills">
          {types.map((t) => (
            <button 
              key={t} 
              className={`pill ${selectedType === t ? 'active-green' : ''}`}
              onClick={() => setSelectedType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="mov-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA / HORA</th>
              <th>TIPO</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>VALOR</th>
              <th>RESPONSABLE</th>
              <th>NOTA</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovs.length > 0 ? (
              filteredMovs.map((mov, index) => {
                let badgeClass = '';
                let Icon = null;
                if (mov.tipo === 'Entrada') {
                  badgeClass = 'badge-entrada';
                  Icon = ChevronUp;
                } else if (mov.tipo === 'Salida') {
                  badgeClass = 'badge-salida';
                  Icon = ChevronDown;
                } else {
                  badgeClass = 'badge-ajuste';
                  Icon = Minus;
                }

                return (
                  <tr key={index}>
                    <td className="text-green">{mov.id}</td>
                    <td className="text-gray">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="text-dark">{mov.fecha}</span>
                        <span>{mov.hora}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-tipo ${badgeClass}`}>
                        <Icon size={14} strokeWidth={3} /> {mov.tipo}
                      </span>
                    </td>
                    <td>
                      <div className="prod-info">
                        <span className="prod-name">{mov.producto}</span>
                        <span className="prod-sku">{mov.sku}</span>
                      </div>
                    </td>
                    <td className={mov.isPositive ? 'text-green' : 'text-red'} style={{ fontWeight: 600 }}>
                      {mov.cantidad}
                    </td>
                    <td className="text-dark">$ {mov.valor.toLocaleString('es-AR')}</td>
                    <td className="text-gray">{mov.responsable}</td>
                    <td className="text-gray">{mov.nota}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                  No se encontraron movimientos que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Registrar Movimiento */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Registrar {modalType}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleRegistrarMovimiento}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group-inv">
                    <label>Producto</label>
                    <input type="text" required placeholder="Ej. Monitor Samsung" 
                      value={nuevoMovimiento.producto} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, producto: e.target.value})} />
                  </div>
                  <div className="form-group-inv" style={{ flex: 0.5 }}>
                    <label>Código SKU</label>
                    <input type="text" placeholder="PRD-00X" 
                      value={nuevoMovimiento.sku} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, sku: e.target.value})} />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group-inv">
                    <label>Cantidad (unidades)</label>
                    <input type="number" required min="1" placeholder="0" 
                      value={nuevoMovimiento.cantidad} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, cantidad: e.target.value})} />
                  </div>
                  <div className="form-group-inv">
                    <label>Valor Total ($)</label>
                    <input type="number" required min="0" placeholder="0.00" 
                      value={nuevoMovimiento.valor} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, valor: e.target.value})} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-inv">
                    <label>Responsable</label>
                    <input type="text" required
                      value={nuevoMovimiento.responsable} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, responsable: e.target.value})} />
                  </div>
                  <div className="form-group-inv">
                    <label>Nota / Motivo</label>
                    <input type="text" placeholder="Ej. Orden de compra" 
                      value={nuevoMovimiento.nota} onChange={(e) => setNuevoMovimiento({...nuevoMovimiento, nota: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MovimientosInventario;
