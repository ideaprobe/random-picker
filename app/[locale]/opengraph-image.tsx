import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Random Wheel - Online Random Picker Tool';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const title = locale === 'zh' ? '随机轮盘' : 'Random Wheel';
  const subtitle = locale === 'zh' 
    ? '在线随机抽取工具' 
    : 'Online Random Picker Tool';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 48,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
