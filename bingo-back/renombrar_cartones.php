<?php

/**
 * Script para renombrar imágenes de cartones de bingo
 * Ejecutar desde la raíz del proyecto Laravel:
 *   php renombrar_cartones.php
 */

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────

// Carpeta de origen donde están tus imágenes actuales
$carpetaOrigen = __DIR__ . '/storage/app/public/cartones';

// Carpeta de destino donde se guardarán renombradas (misma carpeta)
$carpetaDestino = __DIR__ . '/storage/app/public/cartones';

// Extensión de tus imágenes
$extension = 'jpg';

// Prefijo original de los archivos a buscar
$prefijoBuscar = 'CARTON_LLANO_C_';

// Prefijo nuevo para los archivos renombrados
$prefijoNuevo = 'CARTON_';

// ─── SCRIPT ───────────────────────────────────────────────────────────────────

echo "=== Renombrador de Cartones de Bingo ===\n\n";

// 1. Verificar que la carpeta existe
if (!is_dir($carpetaDestino)) {
    echo "❌ No se encontró la carpeta: storage/app/public/cartones\n";
    echo "   Verifica que la ruta sea correcta.\n";
    exit(1);
} else {
    echo "📁 Carpeta encontrada: storage/app/public/cartones\n\n";
}

// 2. Buscar archivos que coincidan con el prefijo
$archivos = glob("{$carpetaOrigen}/{$prefijoBuscar}*.{$extension}");

if (empty($archivos)) {
    echo "⚠️  No se encontraron archivos con el prefijo '{$prefijoBuscar}' en:\n";
    echo "   {$carpetaOrigen}\n";
    echo "\nVerifica que la ruta y el prefijo sean correctos.\n";
    exit(0);
}

echo "🔍 Se encontraron " . count($archivos) . " archivo(s):\n\n";

$contador = 1;
$exitosos = 0;
$errores  = 0;

foreach ($archivos as $rutaOrigen) {
    $nombreArchivo = basename($rutaOrigen);

    // Extraer el número del nombre original (ej: 0001 → 1)
    // Funciona con ceros a la izquierda: 0001, 0002... → 1, 2...
    if (preg_match('/' . preg_quote($prefijoBuscar, '/') . '(\d+)\.' . $extension . '/i', $nombreArchivo, $matches)) {
        $numero = (int) $matches[1]; // Elimina ceros a la izquierda
    } else {
        $numero = $contador; // Fallback: numeración secuencial
    }

    $nombreNuevo = "{$prefijoNuevo}{$numero}.{$extension}";
    $rutaDestino = "{$carpetaDestino}/{$nombreNuevo}";

    // Renombrar archivo en la misma carpeta
    if (rename($rutaOrigen, $rutaDestino)) {
        echo "  ✅ {$nombreArchivo}  →  {$nombreNuevo}\n";
        $exitosos++;
    } else {
        echo "  ❌ Error al renombrar: {$nombreArchivo}\n";
        $errores++;
    }

    $contador++;
}

// 3. Resumen final
echo "\n=== Resumen ===\n";
echo "✅ Exitosos : {$exitosos}\n";
echo "❌ Errores  : {$errores}\n";

if ($exitosos > 0) {
    echo "\n💡 Tus imágenes quedaron renombradas en:\n";
    echo "   storage/app/public/cartones/CARTON_1.jpg\n";
    echo "   storage/app/public/cartones/CARTON_2.jpg  ... etc.\n";
    echo "\n   Accesibles desde la web en:\n";
    echo "   /storage/cartones/CARTON_1.jpg\n";
}