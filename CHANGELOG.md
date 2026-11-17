# Changelog

Todas las modificaciones relevantes de este proyecto.

## [3.0.0] — 2026-11-15

### Corregido
- `total.batteryLoss` se calcula ahora con balance real de SOC (antes mostraba `NaN`).
- Los importadores CSV/JSON están conectados y validan 8.760 valores.
- Los botones de exportación CSV, horario, BOM, DXF y JSON funcionan.
- El botón "Quitar precios horarios" tiene listener.
- "Restablecer" borra la clave correcta de `localStorage`.
- `num()` devuelve "—" en lugar de `NaN` ante valores no finitos.

### Añadido
- Modelo económico completo: VAN, TIR, payback simple y descontado, LCOE.
- Degradación FV, escalado de precios y OPEX, y reposición de batería.
- Verificación eléctrica completa (Voc frío, Vmpp caliente, ventana MPPT, Isc, Impp).
- Dimensionado de cable por caída de tensión y comprobación de ampacidad.
- Exportación de plano DXF en planta con paso entre filas sin sombreado.
- Lista de materiales exportable.
- Autorrelleno de latitud y GHI por provincia.
- Modelo térmico NOCT con temperatura ambiente mensual.
- Reparto horario del GHI con modelo de cielo claro y descomposición de Erbs.
- Detección de recorte por límite de inversor.
- Estimación de vida de batería por ciclado equivalente.
- Tarjetas de "Hipótesis del modelo" y "Alcance y limitaciones".
- Persistencia del tema y detección del tema del sistema.
- Service Worker con versionado de caché y estrategia network-first para navegación.

### Cambiado
- Reorganización interna del código en secciones documentadas.
- Interfaz renovada con métricas ampliadas y tres gráficas.
- El PDF oculta correctamente los elementos no imprimibles.
