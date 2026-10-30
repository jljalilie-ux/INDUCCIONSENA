# Sincronización Continua de Aprendices con Google Sheets y Google Drive

Plan de arquitectura e implementación para permitir que los instructores conecten su Google Drive, generen automáticamente la hoja de cálculo oficial de inducción SENA, y mantengan los datos de registro y resultados de evaluación sincronizados en tiempo real a medida que los aprendices interactúan con la plataforma.

---

## Decisiones Críticas y Preferencias del Usuario

> [!IMPORTANT]
> Las siguientes decisiones fueron confirmadas en la fase de clarificación con el usuario:
> - **Origen de Creación**: El Instructor conecta su Google Drive personal/institucional desde el panel de control y genera la hoja oficial de inducción con un solo clic.
> - **Momentos de Sincronización**: Al registrarse un nuevo aprendiz (alta inmediata) y al culminar la evaluación de inducción (actualización de puntaje, desglose y estado de aprobación).
> - **Estructura y Detalle**: La hoja contendrá los datos personales, tipo y número de documento, ficha, programa, progreso porcentual, puntaje obtenido, intentos, estado de inducción, marcas temporales y consentimiento legal Ley 1581 de 2012.

---

## 1. Visión General del Producto y Valor

- **Propósito**: Proporcionar a los instructores y coordinadores del SENA una planilla centralizada y en vivo en su propio Google Drive sin depender de exportaciones manuales ni hojas locales obsoletas.
- **Audiencia Principal**: 
  - **Instructores y Coordinadores**: Dueños de la hoja de cálculo en su Google Drive, con control de permisos, filtros y fórmulas nativas de Google Sheets.
  - **Aprendices SENA**: Registran sus datos y presentan sus evaluaciones de inducción sin interrupciones ni fricciones, con sincronización transparente en segundo plano.
- **Valor Agregado**:
  - Respaldo dual: Persistencia primaria en Firestore (alta concurrencia y reglas de seguridad) + Réplica en Google Sheets (facilidad de auditoría, reportería y seguimiento institucional del SENA).
  - Cumplimiento de la Ley Estatutaria 1581 de 2012 (Habeas Data) reflejando el consentimiento informado y marcas de tiempo oficiales.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujo de Trabajo del Instructor
1. **Conexión con Google Workspace**: En el `InstructorDashboard`, se añade una tarjeta destacada con estilo visual SENA (verde institucional `#39A900`, azul oscuro `#00324D` y bordes refinados).
2. **Autorización Segura**: Botón oficial *"Conectar con Google Drive"* utilizando la integración de Google Identity / Firebase Auth (Scopes: `spreadsheets` y `drive.file`).
3. **Generación de la Hoja de Inducción**: Con un clic en *"Crear Hoja Oficial de Inducción"*, el sistema:
   - Crea un libro en Google Drive llamado `SENA - Inducción Aprendices - Ficha [Número]`.
   - Aplica formato institucional con cabecera verde SENA, texto en blanco, celdas alineadas y filtros automáticos.
   - Sincroniza inmediatamente la cohorte existente de aprendices.
4. **Indicador de Sincronización en Vivo**: Muestra el ID de la hoja, enlace directo *"Abrir en Google Sheets"*, última hora de sincronización y estado activo (*"En línea • Auto-sincronización activa"*).
5. **Botón de Respaldo Manual**: Opción para forzar sincronización total si se realizan cambios manuales.

### Flujo del Aprendiz (Transparente e Instantáneo)
1. **Registro**: El aprendiz completa el formulario oficial (`ApprenticeRegistrationModal`) y acepta la Ley 1581. Al confirmar:
   - Se guarda en Firestore inmediatamente.
   - Si existe una hoja de cálculo vinculada por el instructor, se inserta una nueva fila en Google Sheets en segundo plano.
2. **Presentación de la Evaluación**: Al responder las preguntas y presionar *"Finalizar Evaluación"* (`InteractiveEvaluation`):
   - Se calcula el puntaje, progreso e insignias.
   - Se actualiza el documento en Firestore y se actualiza la fila correspondiente en Google Sheets (puntaje, estado 'aprobado'/'en_progreso', fecha de finalización).

---

## 3. Decisiones de Producto y Arquitectura

### Decisión 1: Estrategia de Autenticación y Permisos (Least Privilege)
- **Alcance seleccionado**: `https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`.
- **Razón**: `drive.file` otorga acceso exclusivamente a los archivos creados o abiertos por esta aplicación, respetando los estándares de seguridad de Google sin solicitar acceso total a todo el Drive del instructor.

### Decisión 2: Sincronización Fila por Identificador Canónico
- **Enfoque**: La columna A de la hoja de cálculo registrará el ID único del aprendiz (`app-{tipo}-{documento}`).
- **Mecanismo**: 
  - Al registrarse: Operación `spreadsheets.values.append` añade la fila.
  - Al completar la evaluación: Se localiza la fila existente por su Documento/ID o rango y se actualizan únicamente las columnas de progreso, puntaje, estado y fecha de finalización. Si no existía, se anexa limpiamente.

### Decisión 3: Resiliencia ante Desconexión o Cuotas de API
- Si el instructor no tiene sesión activa de Google en un momento dado o la cuota temporal de Google API se excede, los datos nunca se pierden: Firestore mantiene la verdad absoluta, y el panel del instructor ofrece un botón de un clic para *"Sincronizar Aprendices Pendientes"*.

---

## 4. Arquitectura Técnica y Estrategia de Datos

### Diagrama de Componentes y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                          INTERFAZ DE USUARIO                           │
│                                                                        │
│   ┌────────────────────────┐             ┌─────────────────────────┐   │
│   │ Aprendiz: Registro y   │             │ Instructor Dashboard    │   │
│   │ Evaluación Interactiva │             │ Gestión y Vinculación   │   │
│   └───────────┬────────────┘             └────────────┬────────────┘   │
└───────────────┼───────────────────────────────────────┼────────────────┘
                │ Eventos (Registro, Evaluación)         │ Conectar / Crear Hoja
                ▼                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         SERVICIOS Y CONTROLADORES                      │
│                                                                        │
│   ┌────────────────────────┐             ┌─────────────────────────┐   │
│   │   firebaseService.ts   │             │   googleSheetsService   │   │
│   │ (Base de datos primaria│◄───────────►│ (Google Sheets & Drive) │   │
│   │   Firestore en vivo)   │             │  Token en memoria GIS   │   │
│   └───────────┬────────────┘             └────────────┬────────────┘   │
└───────────────┼───────────────────────────────────────┼────────────────┘
                ▼                                       ▼
┌───────────────────────────────┐       ┌────────────────────────────────┐
│      Firebase Firestore       │       │       Google Drive / Sheets    │
│    Colección: `apprentices`   │       │ Hoja: SENA - Inducción Ficha   │
└───────────────────────────────┘       └────────────────────────────────┘
```

### Columnas de la Hoja de Google Sheets
1. **ID Registro**: Identificador canónico del sistema.
2. **Tipo Doc**: CC, TI, CE, PEP.
3. **Número Documento**: Cédula o tarjeta de identidad.
4. **Nombre Completo**: Nombres y apellidos completos.
5. **Ficha de Caracterización**: Código del grupo formativo.
6. **Correo Electrónico**: Correo institucional o personal.
7. **Teléfono / Contacto**: Número telefónico.
8. **Programa de Formación**: Programa del aprendiz.
9. **Regional y Centro**: Ubicación formativa SENA.
10. **Progreso Inducción (%)**: 0% a 100%.
11. **Puntaje Evaluación (%)**: Calificación obtenida.
12. **Intentos**: Cantidad de presentaciones de la evaluación.
13. **Estado**: No Iniciado / En Progreso / Aprobado.
14. **Fecha Registro**: Fecha y hora de alta del aprendiz.
15. **Fecha Finalización**: Fecha y hora de aprobación del examen.
16. **Consentimiento Ley 1581**: Estado de autorización Habeas Data (Aceptado).
17. **Última Sincronización**: Marca de tiempo del último envío a Google Sheets.

---

## 5. Fases de Ejecución Tras Aprobación

1. **Configuración de OAuth**: Invocar `set_up_oauth` con los scopes de Google Drive y Sheets requeridos y esperar la confirmación del usuario en la interfaz.
2. **Servicio Google Sheets (`src/lib/googleSheetsService.ts`)**:
   - Inicialización del cliente OAuth y gestión de token en memoria.
   - Métodos: `createInductionSpreadsheet()`, `appendApprenticeRow()`, `updateApprenticeInSheet()`, `syncAllCohortToSheet()`.
   - Formateo visual automático: Cabeceras verdes SENA (`#39A900`), celdas en negrita, congelamiento de fila 1.
3. **Módulo UI en Panel del Instructor (`src/components/GoogleSheetsSyncCard.tsx`)**:
   - Tarjeta interactiva con estado de vinculación, botón de conexión oficial, selector o creador de hoja, enlace a Google Drive y resumen de registros sincronizados.
4. **Integración con Eventos de Aprendiz (`src/App.tsx`)**:
   - Conectar `handleSuccessRegistration` para invocar la inserción en la hoja.
   - Conectar `handleUpdateApprenticeResult` para actualizar la fila en la hoja de cálculo.
5. **Verificación y Pruebas**:
   - Validar compilación con `compile_applet` y comprobar que no existan errores de lint o TypeScript.
