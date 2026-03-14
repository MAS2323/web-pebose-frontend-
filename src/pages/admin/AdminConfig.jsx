import React, { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import { AdminCard } from "../../components/admin/ui/AdminCard";
import { AdminButton } from "../../components/admin/ui/AdminButton";
import { AdminInput } from "../../components/admin/ui/AdminInput";
import { AdminToast } from "../../components/admin/ui/AdminToast";
import { heroService } from "../../services/admin/heroService";

export const AdminConfig = () => {
  const [config, setConfig] = useState({
    autoplay: true,
    duracion_slide: 5000,
    mostrar_indicadores: true,
    mostrar_flechas: true,
    mostrar_scroll_indicator: true,
    overlay_opacity: 50,
    gradient_start: "#5D1A1A",
    gradient_end: "#3d1212",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await heroService.getConfig();
      setConfig(response.data);
    } catch (error) {
      console.log("Usando configuración por defecto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await heroService.updateConfig(config);
      showToast("success", "Configuración guardada");
    } catch (error) {
      showToast("error", "Error al guardar");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <AdminButton variant="secondary" icon={RefreshCw} onClick={loadConfig}>
          Recargar
        </AdminButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AdminCard title="Hero Slider">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.autoplay}
                  onChange={(e) =>
                    setConfig({ ...config, autoplay: e.target.checked })
                  }
                  className="rounded border-gray-300 text-[#5D1A1A] focus:ring-[#5D1A1A]"
                />
                <span>Autoplay</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.mostrar_indicadores}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      mostrar_indicadores: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-[#5D1A1A] focus:ring-[#5D1A1A]"
                />
                <span>Mostrar indicadores</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.mostrar_flechas}
                  onChange={(e) =>
                    setConfig({ ...config, mostrar_flechas: e.target.checked })
                  }
                  className="rounded border-gray-300 text-[#5D1A1A] focus:ring-[#5D1A1A]"
                />
                <span>Mostrar flechas</span>
              </label>
            </div>

            <div className="space-y-4">
              <AdminInput
                label="Duración del slide (ms)"
                type="number"
                value={config.duracion_slide}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    duracion_slide: parseInt(e.target.value),
                  })
                }
                min={1000}
                max={30000}
                step={500}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacidad del overlay: {config.overlay_opacity}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={config.overlay_opacity}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      overlay_opacity: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Colores">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color inicial del gradiente
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.gradient_start}
                  onChange={(e) =>
                    setConfig({ ...config, gradient_start: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <AdminInput
                  value={config.gradient_start}
                  onChange={(e) =>
                    setConfig({ ...config, gradient_start: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color final del gradiente
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.gradient_end}
                  onChange={(e) =>
                    setConfig({ ...config, gradient_end: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300"
                />
                <AdminInput
                  value={config.gradient_end}
                  onChange={(e) =>
                    setConfig({ ...config, gradient_end: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        <div className="flex justify-end">
          <AdminButton type="submit" isLoading={isLoading} icon={Save}>
            Guardar cambios
          </AdminButton>
        </div>
      </form>

      {toast && <AdminToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminConfig;
