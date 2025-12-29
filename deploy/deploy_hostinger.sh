#!/bin/bash

# ========================================
# Script de Deploy Automatizado - Arquimedes
# VPS Hostinger - Ubuntu 24.04
# ========================================

set -e

echo "🚀 Iniciando deploy do Arquimedes na VPS Hostinger..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Variáveis
PROJECT_DIR="/var/www/arquimedes"
DOMAIN="mscconsultoriarj.com.br"
REPO_URL="https://github.com/Msc-Consultoriarj-org/arquimedes-v.0.2.0.git"

echo -e "${YELLOW}📋 Verificando sistema...${NC}"
echo "Sistema: $(uname -s)"
echo "Versão: $(cat /etc/os-release | grep VERSION= | cut -d'"' -f2)"
echo ""

# ========================================
# 1. ATUALIZAR SISTEMA
# ========================================
echo -e "${YELLOW}📦 Atualizando sistema...${NC}"
apt update && apt upgrade -y

# ========================================
# 2. INSTALAR NODE.JS 22.x
# ========================================
echo -e "${YELLOW}📦 Instalando Node.js 22.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt install -y nodejs
else
    echo "Node.js já instalado: $(node -v)"
fi

# ========================================
# 3. INSTALAR PNPM
# ========================================
echo -e "${YELLOW}📦 Instalando pnpm...${NC}"
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
else
    echo "pnpm já instalado: $(pnpm -v)"
fi

# ========================================
# 4. INSTALAR PM2
# ========================================
echo -e "${YELLOW}📦 Instalando PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
else
    echo "PM2 já instalado: $(pm2 -v)"
fi

# ========================================
# 5. INSTALAR NGINX
# ========================================
echo -e "${YELLOW}📦 Instalando Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
else
    echo "Nginx já instalado: $(nginx -v 2>&1)"
fi

# ========================================
# 6. INSTALAR CERTBOT (SSL)
# ========================================
echo -e "${YELLOW}📦 Instalando Certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
else
    echo "Certbot já instalado: $(certbot --version)"
fi

# ========================================
# 7. CONFIGURAR FIREWALL
# ========================================
echo -e "${YELLOW}🔥 Configurando firewall...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# ========================================
# 8. CLONAR/ATUALIZAR REPOSITÓRIO
# ========================================
echo -e "${YELLOW}📁 Configurando projeto...${NC}"
if [ -d "$PROJECT_DIR" ]; then
    echo "Diretório existe. Atualizando código..."
    cd $PROJECT_DIR
    git pull origin main
else
    echo "Clonando repositório..."
    mkdir -p /var/www
    git clone $REPO_URL $PROJECT_DIR
    cd $PROJECT_DIR
fi

# Criar diretório de logs
mkdir -p $PROJECT_DIR/logs

# ========================================
# 9. INSTALAR DEPENDÊNCIAS
# ========================================
echo -e "${YELLOW}📦 Instalando dependências do projeto...${NC}"
pnpm install

# ========================================
# 10. CONFIGURAR VARIÁVEIS DE AMBIENTE
# ========================================
echo -e "${YELLOW}⚙️  Configurando variáveis de ambiente...${NC}"

# Verificar se .env já existe
if [ -f "$PROJECT_DIR/.env" ]; then
    echo ".env já existe. Mantendo configuração atual."
    echo "Se precisar atualizar, edite: nano $PROJECT_DIR/.env"
else
    echo "Criando arquivo .env..."
    cat > $PROJECT_DIR/.env << 'EOL'
# Ambiente
NODE_ENV=production
PORT=3000

# Database (SUBSTITUA COM SUAS CREDENCIAIS)
DATABASE_URL=mysql://usuario:senha@host:3306/database

# JWT Secret (GERE UMA CHAVE SEGURA)
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# OAuth Manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=seu_app_id_aqui

# Owner Info
OWNER_OPEN_ID=seu_open_id_aqui
OWNER_NAME=Gabriel Luiz

# Certbot (SSL Certificate)
CERTBOT_EMAIL=seu_email@dominio.com

# Manus Forge API
BUILT_IN_FORGE_API_URL=https://forge-api.manus.im
BUILT_IN_FORGE_API_KEY=sua_chave_api_aqui
VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend_aqui
VITE_FRONTEND_FORGE_API_URL=https://forge-api.manus.im

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=seu_website_id_aqui

# App Config
VITE_APP_TITLE=Arquimedes - Matemática Descomplicada
VITE_APP_LOGO=/logo.png
EOL

    echo -e "${RED}⚠️  IMPORTANTE: Edite o arquivo .env com suas credenciais reais!${NC}"
    echo "Execute: nano $PROJECT_DIR/.env"
    echo ""
    read -p "Pressione ENTER após editar o .env para continuar..."
fi

# ========================================
# 11. BUILD DA APLICAÇÃO
# ========================================
echo -e "${YELLOW}🔨 Fazendo build da aplicação...${NC}"
pnpm build

# ========================================
# 12. CONFIGURAR PM2
# ========================================
echo -e "${YELLOW}🚀 Configurando PM2...${NC}"

# Parar instância anterior se existir
pm2 stop arquimedes 2>/dev/null || true
pm2 delete arquimedes 2>/dev/null || true

# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Salvar configuração
pm2 save

# Configurar auto-start
pm2 startup systemd -u root --hp /root

echo -e "${GREEN}✅ PM2 configurado!${NC}"

# ========================================
# 13. CONFIGURAR NGINX
# ========================================
echo -e "${YELLOW}🌐 Configurando Nginx...${NC}"

# Criar configuração do Nginx
cat > /etc/nginx/sites-available/$DOMAIN << 'EOL'
server {
    listen 80;
    listen [::]:80;
    
    server_name mscconsultoriarj.com.br www.mscconsultoriarj.com.br;
    
    # Logs
    access_log /var/log/nginx/arquimedes_access.log;
    error_log /var/log/nginx/arquimedes_error.log;
    
    # Proxy para aplicação Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Arquivos estáticos
    location /assets {
        alias /var/www/arquimedes/dist/client/assets;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Favicon
    location = /favicon.ico {
        alias /var/www/arquimedes/dist/client/favicon.ico;
        access_log off;
        log_not_found off;
    }
    
    # Robots.txt
    location = /robots.txt {
        alias /var/www/arquimedes/dist/client/robots.txt;
        access_log off;
        log_not_found off;
    }
    
    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Tamanho máximo de upload
    client_max_body_size 10M;
}
EOL

# Ativar site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx

echo -e "${GREEN}✅ Nginx configurado!${NC}"

# ========================================
# 14. CONFIGURAR SSL (HTTPS)
# ========================================
echo -e "${YELLOW}🔒 Configurando SSL...${NC}"
echo "Executando Certbot para obter certificado SSL..."
echo ""

# Carregar variáveis de ambiente para o Certbot
if [ -f "$PROJECT_DIR/.env" ]; then
    source "$PROJECT_DIR/.env"
fi

if [ -z "$CERTBOT_EMAIL" ]; then
    echo -e "${RED}ERRO: CERTBOT_EMAIL não está definido no arquivo .env. Abortando.${NC}"
    exit 1
fi

certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email "$CERTBOT_EMAIL" || {
    echo -e "${YELLOW}⚠️  Certbot falhou. Tente executar manualmente:${NC}"
    echo "certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $CERTBOT_EMAIL"
}

# ========================================
# 15. VERIFICAÇÃO FINAL
# ========================================
echo ""
echo "=========================================="
echo -e "${GREEN}✅ DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
echo "=========================================="
echo ""
echo "📊 Status dos Serviços:"
echo "  • Node.js: $(node -v)"
echo "  • pnpm: $(pnpm -v)"
echo "  • PM2: $(pm2 list | grep arquimedes | awk '{print $12}')"
echo "  • Nginx: $(systemctl is-active nginx)"
echo ""
echo "🌐 Acesse seu site:"
echo "  • http://$DOMAIN"
echo "  • https://$DOMAIN (se SSL configurado)"
echo ""
echo "📝 Comandos Úteis:"
echo "  • Ver logs: pm2 logs arquimedes"
echo "  • Reiniciar: pm2 restart arquimedes"
echo "  • Status: pm2 status"
echo "  • Monitorar: pm2 monit"
echo ""
echo "📁 Diretório do projeto: $PROJECT_DIR"
echo ""
echo -e "${YELLOW}⚠️  LEMBRE-SE:${NC}"
echo "  1. Edite o .env com suas credenciais reais"
echo "  2. Configure o DNS do domínio para apontar para 147.79.84.235"
echo "  3. Aguarde propagação do DNS (pode levar até 48h)"
echo ""
