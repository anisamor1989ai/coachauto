"use client";
import { useState } from "react";

const brandColors: Record<string, string> = {
  Dacia: "#0077C8", Renault: "#FFCC00", Toyota: "#EB0A1E",
  Hyundai: "#002C5F", Kia: "#05141F", Volkswagen: "#001E50",
  Peugeot: "#00468B", Citroën: "#C6A84B", Ford: "#003178",
  Seat: "#F20000", Cupra: "#0C1B33", Fiat: "#8B0000",
  Honda: "#CC0000", Nissan: "#C3002F", Suzuki: "#1A3A6B",
  Mitsubishi: "#E60012", Mazda: "#1A1A1A", BMW: "#0066B1",
  Mercedes: "#2D2D2D", Audi: "#BB0A30", Skoda: "#4BA82E",
  Opel: "#FFD900", Chevrolet: "#D4AF37", Volvo: "#003057",
  BYD: "#1DB954", MG: "#C8102E", Chery: "#E4002B",
  Geely: "#003087", GWM: "#CC0000", Changan: "#003087",
  OMODA: "#FF6600", Jaecoo: "#1A1A1A", JAC: "#003087",
  Jetour: "#E4002B", BAIC: "#003087", "Lynk & Co": "#00A0DC",
  Smart: "#00A0DC", XPENG: "#00C8FF", Zeekr: "#1A1A1A",
  Leapmotor: "#FF6600", Deepal: "#003087", ROX: "#E4002B",
  Exeed: "#C8102E", "Alfa Romeo": "#8B0000", Jeep: "#1A1A1A",
  "Land Rover": "#005A2B", DS: "#C8A951",
};

// URLs Wikimedia soigneusement sélectionnées par modèle
const carImages: Record<string, string> = {
  "Dacia Sandero": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/2021_Dacia_Sandero_Expression_TCe_90.jpg/400px-2021_Dacia_Sandero_Expression_TCe_90.jpg",
  "Dacia Logan": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2021_Dacia_Logan_Expression_TCe_90_Front.jpg/400px-2021_Dacia_Logan_Expression_TCe_90_Front.jpg",
  "Dacia Duster": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/2024_Dacia_Duster_Expression_TCe_130_4x2_front.jpg/400px-2024_Dacia_Duster_Expression_TCe_130_4x2_front.jpg",
  "Dacia Jogger": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2022_Dacia_Jogger_Expression_TCe_110_front.jpg/400px-2022_Dacia_Jogger_Expression_TCe_110_front.jpg",
  "Dacia Spring": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/2021_Dacia_Spring_Comfort_front.jpg/400px-2021_Dacia_Spring_Comfort_front.jpg",
  "Dacia Bigster": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dacia_Bigster_Concept_%2850389601791%29.jpg/400px-Dacia_Bigster_Concept_%2850389601791%29.jpg",
  "Renault Clio": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2019_Renault_Clio_V_front_8.1.19.jpg/400px-2019_Renault_Clio_V_front_8.1.19.jpg",
  "Renault Captur": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2019_Renault_Captur_S_Edition_TCe_150_front.jpg/400px-2019_Renault_Captur_S_Edition_TCe_150_front.jpg",
  "Renault Megane": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2016_Renault_Megane_IV_front.jpg/400px-2016_Renault_Megane_IV_front.jpg",
  "Renault Austral": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2022_Renault_Austral_front.jpg/400px-2022_Renault_Austral_front.jpg",
  "Toyota Yaris": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/2020_Toyota_Yaris_hybrid_front.jpg/400px-2020_Toyota_Yaris_hybrid_front.jpg",
  "Toyota Corolla": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2019_Toyota_Corolla_sedan_%28facelift%2C_red%29%2C_front_8.15.19.jpg/400px-2019_Toyota_Corolla_sedan_%28facelift%2C_red%29%2C_front_8.15.19.jpg",
  "Toyota RAV4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2019_Toyota_RAV4_XLE_front_4.15.19.jpg/400px-2019_Toyota_RAV4_XLE_front_4.15.19.jpg",
  "Toyota C-HR": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/2017_Toyota_C-HR_1.2T_front_4.3.18.jpg/400px-2017_Toyota_C-HR_1.2T_front_4.3.18.jpg",
  "Toyota Hilux": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2016_Toyota_HiLux_SR5_%284x4%29_double-cab_utility_%282018-11-02%29_01.jpg/400px-2016_Toyota_HiLux_SR5_%284x4%29_double-cab_utility_%282018-11-02%29_01.jpg",
  "Toyota Land Cruiser": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/2022_Toyota_Land_Cruiser_300_VX_3.5_V6_Twin-Turbo_%28J300%29%2C_front_8.22.22.jpg/400px-2022_Toyota_Land_Cruiser_300_VX_3.5_V6_Twin-Turbo_%28J300%29%2C_front_8.22.22.jpg",
  "Hyundai i10": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2020_Hyundai_i10_1.0_SE_Connect_front.jpg/400px-2020_Hyundai_i10_1.0_SE_Connect_front.jpg",
  "Hyundai i20": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/2020_Hyundai_i20_SE_Connect_1.2_front.jpg/400px-2020_Hyundai_i20_SE_Connect_1.2_front.jpg",
  "Hyundai Tucson": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2021_Hyundai_Tucson_GDi_SE_Connect_front.jpg/400px-2021_Hyundai_Tucson_GDi_SE_Connect_front.jpg",
  "Hyundai Creta": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2020_Hyundai_Creta_SX%2B_front.jpg/400px-2020_Hyundai_Creta_SX%2B_front.jpg",
  "Hyundai Elantra": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2021_Hyundai_Elantra_SE_front.jpg/400px-2021_Hyundai_Elantra_SE_front.jpg",
  "Hyundai Kona": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2024_Hyundai_Kona_1.0_T-GDi_Hybrid_front.jpg/400px-2024_Hyundai_Kona_1.0_T-GDi_Hybrid_front.jpg",
  "Kia Picanto": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2017_Kia_Picanto_1.0_front.jpg/400px-2017_Kia_Picanto_1.0_front.jpg",
  "Kia Rio": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2017_Kia_Rio_1.4_front_9.3.18.jpg/400px-2017_Kia_Rio_1.4_front_9.3.18.jpg",
  "Kia Sportage": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/2022_Kia_Sportage_GT-Line_front.jpg/400px-2022_Kia_Sportage_GT-Line_front.jpg",
  "Kia Stonic": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/2017_Kia_Stonic_1.0T_front.jpg/400px-2017_Kia_Stonic_1.0T_front.jpg",
  "Kia Seltos": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2023_Kia_Seltos_EX_front.jpg/400px-2023_Kia_Seltos_EX_front.jpg",
  "Volkswagen Polo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/VW_Polo_VI_IMG_0192.jpg/400px-VW_Polo_VI_IMG_0192.jpg",
  "Volkswagen Golf": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2020_Volkswagen_Golf_Style_TSI_front.jpg/400px-2020_Volkswagen_Golf_Style_TSI_front.jpg",
  "Volkswagen Tiguan": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/VW_Tiguan_II_Allspace_%E2%80%93_Frontansicht%2C_25._M%C3%A4rz_2017%2C_D%C3%BCsseldorf.jpg/400px-VW_Tiguan_II_Allspace_%E2%80%93_Frontansicht%2C_25._M%C3%A4rz_2017%2C_D%C3%BCsseldorf.jpg",
  "Volkswagen T-Cross": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/2019_Volkswagen_T-Cross_Style_TSI_front.jpg/400px-2019_Volkswagen_T-Cross_Style_TSI_front.jpg",
  "Volkswagen T-Roc": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2018_Volkswagen_T-Roc_SE_TSI_front.jpg/400px-2018_Volkswagen_T-Roc_SE_TSI_front.jpg",
  "Peugeot 208": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2019_Peugeot_208_allure_front.jpg/400px-2019_Peugeot_208_allure_front.jpg",
  "Peugeot 2008": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/2019_Peugeot_2008_Allure_PureTech_130_front.jpg/400px-2019_Peugeot_2008_Allure_PureTech_130_front.jpg",
  "Peugeot 3008": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Peugeot_3008_II_%E2%80%93_Frontansicht%2C_6._April_2016%2C_D%C3%BCsseldorf.jpg/400px-Peugeot_3008_II_%E2%80%93_Frontansicht%2C_6._April_2016%2C_D%C3%BCsseldorf.jpg",
  "Citroën C3": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/2017_Citroen_C3_Feel_PureTech_82_front.jpg/400px-2017_Citroen_C3_Feel_PureTech_82_front.jpg",
  "Citroën C4": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/2021_Citroen_C4_Shine_PureTech_130_front.jpg/400px-2021_Citroen_C4_Shine_PureTech_130_front.jpg",
  "Citroën C5 Aircross": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2019_Citroen_C5_Aircross_Flair_PureTech_130_front.jpg/400px-2019_Citroen_C5_Aircross_Flair_PureTech_130_front.jpg",
  "Seat Ibiza": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/2017_SEAT_Ibiza_FR_TSI_front.jpg/400px-2017_SEAT_Ibiza_FR_TSI_front.jpg",
  "Seat Arona": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2018_SEAT_Arona_FR_TSI_front.jpg/400px-2018_SEAT_Arona_FR_TSI_front.jpg",
  "Skoda Fabia": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2021_Skoda_Fabia_SE_Comfort_1.0_TSI_front.jpg/400px-2021_Skoda_Fabia_SE_Comfort_1.0_TSI_front.jpg",
  "Skoda Octavia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2020_Skoda_Octavia_SE_Technology_TSI_front.jpg/400px-2020_Skoda_Octavia_SE_Technology_TSI_front.jpg",
  "Skoda Karoq": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/2017_Skoda_Karoq_SE_Technology_TDI_front.jpg/400px-2017_Skoda_Karoq_SE_Technology_TDI_front.jpg",
  "Opel Corsa": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/2019_Opel_Corsa_F_Edition_1.2_front.jpg/400px-2019_Opel_Corsa_F_Edition_1.2_front.jpg",
  "Opel Mokka": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/2021_Opel_Mokka_GS_Line_front.jpg/400px-2021_Opel_Mokka_GS_Line_front.jpg",
  "BMW Série 1": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2019_BMW_118i_M_Sport_front.jpg/400px-2019_BMW_118i_M_Sport_front.jpg",
  "BMW Série 3": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/2019_BMW_330i_M_Sport_front.jpg/400px-2019_BMW_330i_M_Sport_front.jpg",
  "BMW X1": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2022_BMW_X1_xDrive23i_front.jpg/400px-2022_BMW_X1_xDrive23i_front.jpg",
  "BMW X3": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2022_BMW_X3_xDrive30e_M_Sport_front.jpg/400px-2022_BMW_X3_xDrive30e_M_Sport_front.jpg",
  "BMW X5": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/2019_BMW_X5_xDrive30d_M_Sport_front.jpg/400px-2019_BMW_X5_xDrive30d_M_Sport_front.jpg",
  "Mercedes Classe A": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/2018_Mercedes-Benz_A200_AMG_Line_front.jpg/400px-2018_Mercedes-Benz_A200_AMG_Line_front.jpg",
  "Mercedes Classe C": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2021_Mercedes-Benz_C200_AMG_Line_front.jpg/400px-2021_Mercedes-Benz_C200_AMG_Line_front.jpg",
  "Mercedes GLA": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2020_Mercedes-Benz_GLA_250_AMG_Line_front.jpg/400px-2020_Mercedes-Benz_GLA_250_AMG_Line_front.jpg",
  "Mercedes GLC": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2022_Mercedes-Benz_GLC_300_AMG_Line_front.jpg/400px-2022_Mercedes-Benz_GLC_300_AMG_Line_front.jpg",
  "Audi A3": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2020_Audi_A3_S_Line_35_TFSI_front.jpg/400px-2020_Audi_A3_S_Line_35_TFSI_front.jpg",
  "Audi Q3": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2018_Audi_Q3_S_Line_35_TFSI_front.jpg/400px-2018_Audi_Q3_S_Line_35_TFSI_front.jpg",
  "Audi Q5": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/2021_Audi_Q5_S_line_45_TFSI_front.jpg/400px-2021_Audi_Q5_S_line_45_TFSI_front.jpg",
  "Honda Civic": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/2022_Honda_Civic_EX_front.jpg/400px-2022_Honda_Civic_EX_front.jpg",
  "Honda HR-V": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2022_Honda_HR-V_eHEV_front.jpg/400px-2022_Honda_HR-V_eHEV_front.jpg",
  "Nissan Qashqai": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2021_Nissan_Qashqai_N-Connecta_DIG-T_138_front.jpg/400px-2021_Nissan_Qashqai_N-Connecta_DIG-T_138_front.jpg",
  "Mazda CX-5": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2017_Mazda_CX-5_Sport_Nav_2.0_front.jpg/400px-2017_Mazda_CX-5_Sport_Nav_2.0_front.jpg",
  "Mazda CX-30": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2020_Mazda_CX-30_GT_front.jpg/400px-2020_Mazda_CX-30_GT_front.jpg",
  "Suzuki Swift": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/2017_Suzuki_Swift_SZ5_ALLGRIP_1.0_Boosterjet_front.jpg/400px-2017_Suzuki_Swift_SZ5_ALLGRIP_1.0_Boosterjet_front.jpg",
  "Suzuki Vitara": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2015_Suzuki_Vitara_SZ4_1.6_front.jpg/400px-2015_Suzuki_Vitara_SZ4_1.6_front.jpg",
  "Suzuki Jimny": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2019_Suzuki_Jimny_SZ5_AllGrip_1.5_front.jpg/400px-2019_Suzuki_Jimny_SZ5_AllGrip_1.5_front.jpg",
  "Fiat Tipo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Fiat_Tipo_%E2%80%93_Frontansicht%2C_5._M%C3%A4rz_2016%2C_D%C3%BCsseldorf.jpg/400px-Fiat_Tipo_%E2%80%93_Frontansicht%2C_5._M%C3%A4rz_2016%2C_D%C3%BCsseldorf.jpg",
  "Jeep Renegade": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/2019_Jeep_Renegade_Limited_front.jpg/400px-2019_Jeep_Renegade_Limited_front.jpg",
  "Jeep Compass": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/2021_Jeep_Compass_Limited_front.jpg/400px-2021_Jeep_Compass_Limited_front.jpg",
  "Land Rover Range Rover Evoque": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2019_Range_Rover_Evoque_SE_front.jpg/400px-2019_Range_Rover_Evoque_SE_front.jpg",
  "Volvo XC40": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/2018_Volvo_XC40_T5_R-Design_front.jpg/400px-2018_Volvo_XC40_T5_R-Design_front.jpg",
  "MG ZS": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/2022_MG_ZS_Excite_front.jpg/400px-2022_MG_ZS_Excite_front.jpg",
  "BYD Atto 3": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/2022_BYD_Atto_3_front.jpg/400px-2022_BYD_Atto_3_front.jpg",
  "BYD Seal": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BYD_Seal_front.jpg/400px-BYD_Seal_front.jpg",
};

interface CarImageProps {
  brand: string;
  model: string;
  category?: string;
  className?: string;
}

export default function CarImage({ brand, model, category = "Berline", className = "" }: CarImageProps) {
  const [imgError, setImgError] = useState(false);
  const key = `${brand} ${model}`;
  const imageUrl = carImages[key] 
  ? carImages[key].replace('upload.wikimedia.org/wikipedia/commons/thumb/', 'upload.wikimedia.org/wikipedia/commons/thumb/').replace('/400px-', '/320px-')
  : null;
  const color = brandColors[brand] || "#CC0000";

  // Fallback SVG par catégorie
  const fallback = (
    <div className={`relative overflow-hidden rounded-xl flex flex-col items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}15, ${color}30)` }}>
      <div className="text-5xl mb-2">🚗</div>
      <div className="text-xs font-bold opacity-60" style={{ color }}>{brand}</div>
      <div className="text-xs opacity-40" style={{ color }}>{model}</div>
    </div>
  );

  if (!imageUrl || imgError) return fallback;

 return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-50 ${className}`}>
      <img
        src={imageUrl}
        alt={`${brand} ${model}`}
        className="w-full h-full object-cover absolute inset-0"
        onError={() => setImgError(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-2">
        <span className="text-white text-xs font-bold">{brand} {model}</span>
      </div>
    </div>
  );
}