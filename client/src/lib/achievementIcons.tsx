// Mapeamento de ícones de conquistas para imagens visuais
export const ACHIEVEMENT_ICON_IMAGES: Record<string, string> = {
  '📖': '/badges/primeira-aula.png',
  'BookOpen': '/badges/primeira-aula.png',
  '🎓': '/badges/estudante-dedicado.png',
  'GraduationCap': '/badges/estudante-dedicado.png',
  '➕': '/badges/mestre-adicao.png',
  'Plus': '/badges/mestre-adicao.png',
  '✖️': '/badges/mestre-multiplicacao.png',
  '×': '/badges/mestre-multiplicacao.png',
  'X': '/badges/mestre-multiplicacao.png',
  '➗': '/badges/mestre-divisao.png',
  'Divide': '/badges/mestre-divisao.png',
};

interface AchievementIconProps {
  icon: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

export function AchievementIcon({ icon, title, size = 'md', className = '' }: AchievementIconProps) {
  const imageUrl = ACHIEVEMENT_ICON_IMAGES[icon];
  
  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={title}
        className={`${sizeClasses[size]} object-contain ${className}`}
      />
    );
  }
  
  // Fallback para ícones não mapeados (emoji ou texto)
  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center text-4xl ${className}`}>
      {icon}
    </div>
  );
}
