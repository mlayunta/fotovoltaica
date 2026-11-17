# ☀️ Solar Layunta

Herramienta web de **predimensionamiento fotovoltaico profesional** con simulación horaria
de 8.760 intervalos, gestión de almacenamiento, verificación técnica y análisis económico
completo (VAN, TIR, payback y LCOE).

Desarrollada por **Miguel Ángel Layunta López**.

---

## ✨ Funcionalidades

- **Simulación horaria real** de 8.760 intervalos con balance de energía y estado de carga (SOC).
- **Modelo solar analítico**: geometría solar, cielo claro (Kasten-Young + Meinel), descomposición
  de Erbs y transposición isotrópica (Liu-Jordan).
- **Modelo térmico NOCT** con temperatura ambiente mensual estimada.
- **Importación de datos reales**:
  - Curva de consumo horaria (CSV, 8.760 valores).
  - Producción horaria de PVGIS (JSON con `outputs.hourly`).
  - Precios horarios de compra y excedente (CSV).
- **Comparador de escenarios** de batería con VAN y payback por escenario.
- **Verificación técnica completa**: tensiones en frío y en caliente, ventana MPPT,
  corrientes máximas, relación DC/AC y recorte por límite de inversor.
- **Dimensionado de cable** por caída de tensión y comprobación orientativa de ampacidad.
- **Análisis económico**: flujos anuales con degradación, escalado de precios, reposición
  de batería, VAN, TIR, payback simple y descontado, y LCOE.
- **Exportación**: informe PDF, balances CSV (mensual y horario), lista de materiales,
  plano DXF en planta y proyecto JSON.
- **PWA instalable** con funcionamiento offline.
- **Modo claro y oscuro** con persistencia y detección del tema del sistema.

---

## 🚀 Uso local

No requiere compilación ni dependencias instaladas. Basta con servir la carpeta:

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node
npx serve .
