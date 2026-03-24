import { useState, type FC } from 'react';
import { TextField, Card, Grid, Heading, Text, Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { Search, Layers, UserCircle, ShoppingCart, Repeat, Square, Star } from 'lucide-react';
import { SHANGHAI_ROUNDS, SCORING } from '../constants/rules';
import { Card as PlayingCard } from './Card';
import { useTranslation } from 'react-i18next';

type RadixColor = 'blue' | 'indigo' | 'violet' | 'purple' | 'plum' | 'crimson' | 'red';

const ROUND_COLORS: RadixColor[] = ['blue', 'indigo', 'violet', 'purple', 'plum', 'crimson', 'red'];

const SectionHeading: FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Flex align="center" gap="3" className="anim-section" style={{ marginBottom: 24, animationDelay: `${delay}ms` }}>
    <Heading size="5">{children}</Heading>
    <Box style={{ flex: 1, height: '1px', background: 'var(--gray-a4)' }} />
  </Flex>
);

const ContractBadge: FC<{ type: 'Set' | 'Run'; count: number; color: RadixColor; label: string }> = ({ type, count, color, label }) => (
  <Badge color={color} variant="soft" radius="full" size="2">
    <Flex align="center" gap="1">
      {type === 'Set' ? <Square size={10} /> : <Repeat size={10} />}
      <span>{label} ×{count}</span>
    </Flex>
  </Badge>
);

export const Rulebook: FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const rules = [
    { id: 'decks',  title: t('rules.items.decks'),  content: t('rules.items.decks_desc'),  icon: <Layers size={20} /> },
    { id: 'hand',   title: t('rules.items.hand'),   content: t('rules.items.hand_desc'),   icon: <UserCircle size={20} /> },
    { id: 'buy',    title: t('rules.items.buy'),    content: t('rules.items.buy_desc'),    icon: <ShoppingCart size={20} /> },
    { id: 'runs',   title: t('rules.items.runs'),   content: t('rules.items.runs_desc'),   icon: <Repeat size={20} /> },
    { id: 'sets',   title: t('rules.items.sets'),   content: t('rules.items.sets_desc'),   icon: <Square size={20} /> },
    { id: 'jokers', title: t('rules.items.jokers'), content: t('rules.items.jokers_desc'), icon: <Star size={20} /> },
  ];

  const filteredRules = rules.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex direction="column" gap="8">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box mb="2">
        <Heading size="9" weight="bold" className="anim-hero-title" style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          {t('rules.heroTitle')}
        </Heading>
        <Text size="4" color="gray" className="anim-hero-subtitle" style={{ marginTop: 12, display: 'block' }}>
          {t('rules.heroSubtitle')}
        </Text>
      </Box>

      {/* ── General Rules ────────────────────────────────────────────── */}
      <Box>
        <Flex align="center" justify="between" gap="4" className="anim-section" style={{ marginBottom: 24, animationDelay: '150ms' }}>
          <Flex align="center" gap="3" style={{ flex: 1 }}>
            <Heading size="5">{t('rules.title')}</Heading>
            <Box style={{ flex: 1, height: '1px', background: 'var(--gray-a4)' }} />
          </Flex>
          <TextField.Root
            placeholder={t('rules.searchPlaceholder')}
            size="3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="surface"
            className="search-desktop"
            style={{ width: 280, flexShrink: 0 }}
          >
            <TextField.Slot>
              <Search size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {filteredRules.length === 0 ? (
          <Flex align="center" gap="2" p="6">
            <Search size={16} color="var(--gray-7)" />
            <Text color="gray" size="2">{t('rules.noResults')}</Text>
          </Flex>
        ) : (
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="3">
            {filteredRules.map((rule, i) => (
              <Card
                key={rule.id}
                variant="surface"
                className="anim-card"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid var(--gray-a3)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  animationDelay: `${200 + i * 60}ms`,
                }}
              >
                <Flex gap="3" align="start">
                  <Box style={{ color: 'var(--accent-9)', flexShrink: 0, marginTop: 2 }}>
                    {rule.icon}
                  </Box>
                  <Flex direction="column" gap="1">
                    <Text size="2" weight="bold">{rule.title}</Text>
                    <Text size="2" color="gray" style={{ lineHeight: '1.55' }}>{rule.content}</Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        )}
      </Box>

      {/* ── Rounds + Scoring ─────────────────────────────────────────── */}
      <Box>
      <Grid columns={{ initial: '1', md: '5' }} gap="8">

        {/* Scoring — wider column */}
        <Box style={{ gridColumn: 'span 3' }}>
          <SectionHeading delay={250}>{t('rules.scoring')}</SectionHeading>
          <Grid columns="2" gap="3" mb="4">
            {[
              {
                label: '2 – 9', pts: SCORING['2-9'],
                overlap: -32,
                cards: [
                  { id: 's-2', suit: 'Spades'   as const, rank: '2' as const, isJoker: false },
                  { id: 's-3', suit: 'Hearts'   as const, rank: '3' as const, isJoker: false },
                  { id: 's-4', suit: 'Diamonds' as const, rank: '4' as const, isJoker: false },
                  { id: 's-5', suit: 'Clubs'    as const, rank: '5' as const, isJoker: false },
                  { id: 's-6', suit: 'Spades'   as const, rank: '6' as const, isJoker: false },
                  { id: 's-7', suit: 'Hearts'   as const, rank: '7' as const, isJoker: false },
                  { id: 's-8', suit: 'Diamonds' as const, rank: '8' as const, isJoker: false },
                  { id: 's-9', suit: 'Clubs'    as const, rank: '9' as const, isJoker: false },
                ],
              },
              {
                label: '10 – K', pts: SCORING['10-K'],
                overlap: -18,
                cards: [
                  { id: 's-J', suit: 'Spades'   as const, rank: 'J' as const, isJoker: false },
                  { id: 's-Q', suit: 'Hearts'   as const, rank: 'Q' as const, isJoker: false },
                  { id: 's-K', suit: 'Diamonds' as const, rank: 'K' as const, isJoker: false },
                ],
              },
              {
                label: 'Ace', pts: SCORING['A'],
                overlap: -18,
                cards: [
                  { id: 's-As', suit: 'Spades'   as const, rank: 'A' as const, isJoker: false },
                  { id: 's-Ah', suit: 'Hearts'   as const, rank: 'A' as const, isJoker: false },
                  { id: 's-Ad', suit: 'Diamonds' as const, rank: 'A' as const, isJoker: false },
                  { id: 's-Ac', suit: 'Clubs'    as const, rank: 'A' as const, isJoker: false },
                ],
              },
              {
                label: 'Joker', pts: SCORING['Joker'],
                overlap: 0,
                cards: [
                  { id: 's-jk', suit: 'Joker' as const, rank: 'Joker' as const, isJoker: true },
                ],
              },
            ].map(({ label, pts, cards, overlap }, i) => (
              <Card
                key={label}
                variant="surface"
                className="anim-card anim-card-static"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid var(--gray-a3)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  animationDelay: `${300 + i * 80}ms`,
                }}
              >
                <Flex direction="column" align="center" style={{ gap: 24, paddingTop: 8, paddingBottom: 6 }}>
                  <div className="scoring-cards-display" style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 76 }}>
                    {cards.map((card, ci) => (
                      <div key={card.id} style={{ marginLeft: ci === 0 ? 0 : overlap, zIndex: ci, position: 'relative' }}>
                        <PlayingCard card={card} />
                      </div>
                    ))}
                  </div>
                  <Flex direction="column" align="center" style={{ gap: 2 }}>
                    <Text size="1" color="gray" weight="bold" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</Text>
                    <Flex align="baseline" gap="1">
                      <Text size="5" weight="bold" color="jade">{pts}</Text>
                      <Text size="1" color="jade">pts</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
          <Text size="2" color="gray" style={{ lineHeight: '1.6' }}>
            {t('rules.scoringDesc')}
          </Text>
        </Box>

        {/* Rounds — narrow column */}
        <Box className="rounds-section" style={{ gridColumn: 'span 2' }}>
          <SectionHeading delay={250}>{t('rules.rounds')}</SectionHeading>
          <Flex direction="column" gap="2">
            {SHANGHAI_ROUNDS.map((round, i) => {
              const color = ROUND_COLORS[i];
              const totalCards = round.contracts.reduce((sum, c) => sum + c.count, 0);
              return (
                <Card
                  key={round.id}
                  variant="surface"
                  className="anim-card"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid var(--gray-a3)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    animationDelay: `${300 + i * 50}ms`,
                  }}
                >
                  <Flex align="center" gap="3">
                    <Badge color={color} variant="solid" radius="full" size="1" style={{ minWidth: 60, justifyContent: 'center' }}>
                      {t('game.round')} {round.id}
                    </Badge>
                    <Flex gap="2" wrap="wrap" style={{ flex: 1 }}>
                      {round.contracts.map((contract, ci) => (
                        <ContractBadge
                          key={ci}
                          type={contract.type as 'Set' | 'Run'}
                          count={contract.count}
                          color={color}
                          label={t(`game.${contract.type.toLowerCase()}`)}
                        />
                      ))}
                    </Flex>
                    <Text size="1" color="gray" style={{ flexShrink: 0 }}>{totalCards}c</Text>
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </Box>

      </Grid>
      </Box>

      <Separator size="4" />

      {/* ── Tips ─────────────────────────────────────────────────────── */}
      <Box
        p="6"
        style={{
          background: 'rgba(255,255,255,0.45)',
          borderRadius: 'var(--radius-4)',
          border: '1px solid var(--accent-a3)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <Flex align="center" gap="2" mb="4">
          <Star size={18} color="var(--accent-9)" />
          <Heading size="4">{t('rules.tipsTitle')}</Heading>
        </Flex>
        <Grid columns={{ initial: '1', md: '3' }} gap="3">
          {[
            { title: t('rules.tips.watch.title'), desc: t('rules.tips.watch.desc') },
            { title: t('rules.tips.buys.title'),  desc: t('rules.tips.buys.desc') },
            { title: t('rules.tips.dump.title'),  desc: t('rules.tips.dump.desc') },
          ].map((tip, i) => (
            <Box
              key={tip.title}
              p="4"
              className="anim-card"
              style={{
                background: 'rgba(255,255,255,0.55)',
                borderRadius: 'var(--radius-3)',
                border: '1px solid var(--gray-a3)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                animationDelay: `${400 + i * 80}ms`,
              }}
            >
              <Text size="2" weight="bold" mb="1" style={{ display: 'block' }}>{tip.title}</Text>
              <Text size="2" color="gray" style={{ lineHeight: '1.55' }}>{tip.desc}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};
