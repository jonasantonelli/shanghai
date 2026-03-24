import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        rules: 'Rules',
        validator: 'Validator'
      },
      rules: {
        title: 'General Rules',
        rounds: 'The 7 Rounds',
        scoring: 'Scoring',
        searchPlaceholder: 'Search rules...',
        heroTitle: 'Shanghai Rum',
        heroSubtitle: 'Learn the rules, understand the rounds, and master the scoring system.',
        heroBadge: 'Master the Game',
        noResults: 'No rules found matching your search.',
        scoringDesc: 'Points are counted for cards remaining in your hand at the end of each round. Lowest total after 7 rounds wins.',
        tipsTitle: 'Tips for Winning',
        tips: {
          watch: {
            title: 'Watch the Discards',
            desc: 'Pay attention to what others are throwing away to know which sets or runs are still possible.'
          },
          buys: {
            title: 'Manage Your Buys',
            desc: 'Use your 3 buys strategically. Buying early can give you more options, but also more points if you get stuck.'
          },
          dump: {
            title: 'Dump High Points',
            desc: 'If someone is close to going out, try to discard your Jokers and face cards first to minimize your score.'
          }
        },
        items: {
          decks: 'Decks',
          decks_desc: '2 Standard Decks (including 4 Jokers) are used.',
          hand: 'Hand Size',
          hand_desc: '11 cards are dealt to each player every round.',
          buy: 'Buying',
          buy_desc: 'Max 3 buys per round out of turn. Priority goes to the player closest to the left of the discarder. No extra card penalty.',
          runs: 'Runs',
          runs_desc: 'Must be suited. Aces can be High (Q-K-A) or Low (A-2-3). No wrap-around (K-A-2).',
          sets: 'Sets',
          sets_desc: 'Can include duplicate suits (e.g., two 7 of Spades).',
          jokers: 'Jokers',
          jokers_desc: 'Worth 20 points if caught in hand. Can be stolen by the correct natural card, but must stay within that specific Run.'
        }
      },
      game: {
        round: 'Round',
        set: 'Set',
        run: 'Run',
        contract: 'Contract',
        of: 'of'
      },
      validator: {
        roundSelection: 'Round Selection',
        cardLibrary: 'Card Library',
        addToSlot: 'ADD TO SLOT',
        valid: 'Valid',
        invalid: 'Invalid',
        winnerPlaceholder: 'Winner Name',
        claimTrophy: 'Claim Trophy',
        success: 'Verification Successful',
        successDesc: 'Your hand meets all contract requirements for {{round}}.',
        trophyTitle: 'Shanghai Champion',
        trophyDesc: 'Congratulations, {{name}}! You\'ve mastered the complexity of {{round}}.',
        finish: 'Finish Round',
        addJoker: 'Add Joker'
      }
    }
  },
  pt: {
    translation: {
      nav: {
        rules: 'Regras',
        validator: 'Validador'
      },
      rules: {
        title: 'Regras Gerais',
        rounds: 'As 7 Rodadas',
        scoring: 'Pontuação',
        searchPlaceholder: 'Pesquisar regras...',
        heroTitle: 'Shanghai Rum',
        heroSubtitle: 'Aprenda as regras, entenda as rodadas e domine o sistema de pontuação.',
        heroBadge: 'Domine o Jogo',
        noResults: 'Nenhuma regra encontrada para sua pesquisa.',
        scoringDesc: 'Os pontos são contados pelas cartas que restam na sua mão ao final de cada rodada. O menor total após 7 rodadas vence.',
        tipsTitle: 'Dicas para Vencer',
        tips: {
          watch: {
            title: 'Observe os Descartes',
            desc: 'Preste atenção no que os outros estão jogando fora para saber quais trincas ou sequências ainda são possíveis.'
          },
          buys: {
            title: 'Gerencie suas Compras',
            desc: 'Use suas 3 compras estrategicamente. Comprar cedo pode dar mais opções, mas também mais pontos se você ficar preso.'
          },
          dump: {
            title: 'Livre-se dos Pontos Altos',
            desc: 'Se alguém estiver prestes a bater, tente descartar seus Coringas e cartas de figura primeiro para minimizar seu score.'
          }
        },
        items: {
          decks: 'Baralhos',
          decks_desc: 'São utilizados 2 baralhos padrão (incluindo 4 Coringas).',
          hand: 'Tamanho da Mão',
          hand_desc: '11 cartas são distribuídas para cada jogador em cada rodada.',
          buy: 'Compras (Buy)',
          buy_desc: 'Máximo de 3 compras fora da vez por rodada. A prioridade é do jogador à esquerda de quem descartou. Sem penalidade de cartas extras.',
          runs: 'Sequências (Runs)',
          runs_desc: 'Devem ser do mesmo naipe. Ás pode ser Alto (Q-K-A) ou Baixo (A-2-3). Não é permitido "wrap-around" (K-A-2).',
          sets: 'Trincas (Sets)',
          sets_desc: 'Podem incluir naipes duplicados (ex: dois 7 de Espadas).',
          jokers: 'Coringas (Jokers)',
          jokers_desc: 'Valem 20 pontos se ficarem na mão. Podem ser roubados pela carta natural correta, mas devem permanecer na mesma sequência.'
        }
      },
      game: {
        round: 'Rodada',
        set: 'Trinca',
        run: 'Sequência',
        contract: 'Contrato',
        of: 'de'
      },
      validator: {
        roundSelection: 'Seleção da Rodada',
        cardLibrary: 'Biblioteca de Cartas',
        addToSlot: 'ADICIONAR AO ESPAÇO',
        valid: 'Válido',
        invalid: 'Inválido',
        winnerPlaceholder: 'Nome do Vencedor',
        claimTrophy: 'Reivindicar Troféu',
        success: 'Verificação Bem-sucedida',
        successDesc: 'Sua mão atende a todos os requisitos do contrato para {{round}}.',
        trophyTitle: 'Campeão de Shanghai',
        trophyDesc: 'Parabéns, {{name}}! Você dominou a complexidade de {{round}}.',
        finish: 'Finalizar Rodada',
        addJoker: 'Adicionar Coringa'
      }
    }
  },
  es: {
    translation: {
      nav: {
        rules: 'Reglas',
        validator: 'Validador'
      },
      rules: {
        title: 'Reglas Generales',
        rounds: 'Las 7 Rondas',
        scoring: 'Puntuación',
        searchPlaceholder: 'Buscar reglas...',
        heroTitle: 'Shanghai Rum',
        heroSubtitle: 'Aprende las reglas, entiende las rondas y domina el sistema de puntuación.',
        heroBadge: 'Domina el Juego',
        noResults: 'No se encontraron reglas que coincidan con tu búsqueda.',
        scoringDesc: 'Los puntos se cuentan por las cartas que quedan en tu mano al final de cada ronda. El total más bajo tras 7 rondas gana.',
        tipsTitle: 'Consejos para Ganar',
        tips: {
          watch: {
            title: 'Observa los Descartes',
            desc: 'Presta atención a lo que otros tiran para saber qué tercias o escaleras aún son posibles.'
          },
          buys: {
            title: 'Gestiona tus Compras',
            desc: 'Usa tus 3 compras estratégicamente. Comprar pronto puede darte más opciones, pero también más puntos si te quedas atascado.'
          },
          dump: {
            title: 'Deshazte de los Puntos Altos',
            desc: 'Si alguien está cerca de cerrar, intenta descartar tus Comodines y figuras primero para minimizar tu puntuación.'
          }
        },
        items: {
          decks: 'Barajas',
          decks_desc: 'Se utilizan 2 barajas estándar (incluyendo 4 Comodines).',
          hand: 'Tamaño de la Mano',
          hand_desc: 'Se reparten 11 cartas a cada jugador en cada ronda.',
          buy: 'Compras (Buy)',
          buy_desc: 'Máximo de 3 compras fuera de turno por ronda. La prioridad es para el jugador a la izquierda de quien descartó. Sin penalización de cartas extra.',
          runs: 'Escaleras (Runs)',
          runs_desc: 'Deben ser del mismo palo. El As puede ser Alto (Q-K-A) o Bajo (A-2-3). No se permite "wrap-around" (K-A-2).',
          sets: 'Tercias (Sets)',
          sets_desc: 'Pueden incluir palos duplicados (ej: dos 7 de Espadas).',
          jokers: 'Comodines (Jokers)',
          jokers_desc: 'Valen 20 puntos si se quedan en la mano. Pueden ser robados por la carta natural correcta, pero deben permanecer en la misma escalera.'
        }
      },
      game: {
        round: 'Ronda',
        set: 'Tercia',
        run: 'Escalera',
        contract: 'Contrato',
        of: 'de'
      },
      validator: {
        roundSelection: 'Selección de Ronda',
        cardLibrary: 'Biblioteca de Cartas',
        addToSlot: 'AÑADIR AL ESPACIO',
        valid: 'Válido',
        invalid: 'Inválido',
        winnerPlaceholder: 'Nombre del Ganador',
        claimTrophy: 'Reclamar Trofeo',
        success: 'Verificación Exitosa',
        successDesc: 'Tu mano cumple con todos los requisitos del contrato para {{round}}.',
        trophyTitle: 'Campeón de Shanghai',
        trophyDesc: '¡Felicidades, {{name}}! Has dominado la complejidad de {{round}}.',
        finish: 'Finalizar Ronda',
        addJoker: 'Añadir Comodín'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt', 'es'],
    load: 'languageOnly', // e.g., maps pt-BR to pt
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'shanghai-language', // Custom key for consistency
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
