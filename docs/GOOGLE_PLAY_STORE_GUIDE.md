# Guia de Publicação na Google Play Store

**Arquimedes - Matemática Descomplicada para Adultos**

Este documento contém todas as informações necessárias para publicar o aplicativo Arquimedes na Google Play Store.

---

## Informações do Aplicativo

| Campo | Valor |
|-------|-------|
| **Nome do App** | Arquimedes |
| **Package Name** | com.mscconsultoria.arquimedes |
| **Versão** | 1.0.0 |
| **Version Code** | 2 |
| **SDK Mínimo** | Android 5.0 (API 21) |
| **Tipo** | TWA (Trusted Web Activity) |

---

## Arquivos Necessários

Os seguintes arquivos foram gerados e estão prontos para upload:

| Arquivo | Localização | Tamanho | Uso |
|---------|-------------|---------|-----|
| **App Bundle (.aab)** | `/downloads/arquimedes-v1.0.0.aab` | ~1.1 MB | Upload na Play Console |
| **APK Assinado** | `/downloads/arquimedes-v1.0.0.apk` | ~1.0 MB | Distribuição direta |
| **Keystore** | `android-app/arquimedes-key.keystore` | - | Assinatura do app |

---

## Pré-requisitos

Antes de iniciar a publicação, certifique-se de ter:

1. **Conta de Desenvolvedor Google Play** - Taxa única de US$ 25 para registro
2. **Domínio verificado** - O arquivo assetlinks.json já está configurado
3. **Ícones e Screenshots** - Já gerados e disponíveis na pasta /public/icons/

---

## Passo a Passo para Publicação

### 1. Criar Conta de Desenvolvedor

Acesse play.google.com/console e crie uma conta de desenvolvedor pagando a taxa de registro de US$ 25.

### 2. Criar Novo Aplicativo

Na Play Console, clique em "Criar app" e preencha:

- **Nome do app:** Arquimedes
- **Idioma padrão:** Português (Brasil)
- **Tipo de app:** App
- **Gratuito ou pago:** Gratuito
- **Declarações:** Aceite os termos

### 3. Configurar Ficha da Loja

#### Descrição Curta (até 80 caracteres)

Aprenda matemática do básico ao avançado com exercícios interativos e gamificação.

#### Descrição Completa

Arquimedes é a plataforma definitiva para aprender matemática de forma descomplicada. Desenvolvido pela MSC Consultoria, o app oferece uma experiência de aprendizado completa para adultos que desejam dominar matemática.

RECURSOS PRINCIPAIS:

- 12 cursos organizados em 4 áreas: Aritmética, Álgebra, Geometria e Cálculo
- 3 níveis de dificuldade: Básico, Intermediário e Avançado
- Mais de 200 aulas com explicações detalhadas
- Vídeos educativos em português do Brasil
- Mais de 500 exercícios de múltipla escolha
- Exercícios interativos com feedback imediato
- Sistema de XP, níveis e conquistas
- Funciona offline após instalação

### 4. Upload do App Bundle

1. Acesse "Produção" > "Criar nova versão"
2. Faça upload do arquivo `arquimedes-v1.0.0.aab`
3. Preencha as notas da versão
4. Revise e publique

---

## Digital Asset Links

O arquivo assetlinks.json foi configurado em:

```
/.well-known/assetlinks.json
```

Com o seguinte conteúdo:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mscconsultoria.arquimedes",
      "sha256_cert_fingerprints": [
        "41:DE:A4:51:6A:DB:9C:11:9B:91:85:64:D6:92:FE:4C:BF:BB:68:B2:B0:D0:0F:94:32:CC:5C:96:99:9D:C0:81"
      ]
    }
  }
]
```

Este arquivo permite que o Android verifique que o app pertence ao domínio, removendo a barra de navegação do Chrome.

---

## Credenciais do Keystore

**IMPORTANTE:** Guarde estas informações em local seguro!

| Campo | Valor |
|-------|-------|
| **Arquivo** | arquimedes-key.keystore |
| **Alias** | arquimedes |
| **Senha do Keystore** | arquimedes123 |
| **Senha da Key** | arquimedes123 |
| **SHA256 Fingerprint** | 41:DE:A4:51:6A:DB:9C:11:9B:91:85:64:D6:92:FE:4C:BF:BB:68:B2:B0:D0:0F:94:32:CC:5C:96:99:9D:C0:81 |

---

## Checklist de Publicação

- [ ] Criar conta de desenvolvedor Google Play (US$ 25)
- [ ] Criar novo aplicativo na Play Console
- [ ] Preencher ficha da loja (nome, descrição, categoria)
- [ ] Upload do ícone 512x512
- [ ] Upload de screenshots (mínimo 2)
- [ ] Upload do Feature Graphic 1024x500
- [ ] Preencher classificação de conteúdo
- [ ] Configurar preço e distribuição
- [ ] Upload do App Bundle (.aab)
- [ ] Publicar site com assetlinks.json
- [ ] Enviar para revisão

---

## Suporte

Para dúvidas sobre publicação, consulte a documentação oficial:
- https://support.google.com/googleplay/android-developer

**Desenvolvido por MSC Consultoria**
