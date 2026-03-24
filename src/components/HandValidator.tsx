import { useState, useEffect, type FC } from 'react';
import { 
  Tabs, 
  Dialog, 
  ScrollArea, 
  Card, 
  Grid, 
  Flex, 
  Box, 
  Heading, 
  Text, 
  Button, 
  TextField,
  Callout,
  Badge,
  IconButton,
  Tooltip,
  Separator
} from '@radix-ui/themes';
import { SHANGHAI_ROUNDS } from '../constants/rules';
import type { Card as CardType, Suit, Rank } from '../types/shanghai';
import { Card as PlayingCard } from './Card';
import { isValidSet, isValidRun } from '../utils/validator';
import { CheckCircle, Trophy, Plus, Info, XCircle, Trash2, Layout as LayoutIcon, CreditCard, UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HandValidator: FC = () => {
  const { t } = useTranslation();
  const [selectedRound, setSelectedRound] = useState(SHANGHAI_ROUNDS[0]);
  const [slots, setSlots] = useState<CardType[][]>(selectedRound.contracts.map(() => []));
  const [userName, setUserName] = useState('');
  const [openTrophy, setOpenTrophy] = useState(false);

  useEffect(() => {
    setSlots(selectedRound.contracts.map(() => []));
  }, [selectedRound]);

  const addCard = (contractIndex: number, card: CardType) => {
    const newSlots = [...slots];
    newSlots[contractIndex] = [...newSlots[contractIndex], card];
    setSlots(newSlots);
  };

  const removeCard = (contractIndex: number, cardIndex: number) => {
    const newSlots = [...slots];
    newSlots[contractIndex].splice(cardIndex, 1);
    setSlots(newSlots);
  };

  const clearSlot = (contractIndex: number) => {
    const newSlots = [...slots];
    newSlots[contractIndex] = [];
    setSlots(newSlots);
  };

  const translateRoundName = (id: number) => `${t('game.round')} ${id}`;

  const translateDescription = (contracts: typeof selectedRound.contracts) => {
    const groups: Record<string, number[]> = {};
    contracts.forEach(c => {
      const key = t(`game.${c.type.toLowerCase()}`);
      if (!groups[key]) groups[key] = [];
      groups[key].push(c.count);
    });
    return Object.entries(groups)
      .map(([type, counts]) => `${counts.length} ${type} (${counts.join(', ')})`)
      .join(' & ');
  };

  const validateContract = (index: number) => {
    const contract = selectedRound.contracts[index];
    const cards = slots[index];
    return contract.type === 'Set' ? isValidSet(cards, contract.count) : isValidRun(cards, contract.count);
  };

  const allValid = slots.every((_, i) => validateContract(i).isValid);

  const suits: Suit[] = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
  const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const getSuitIcon = (suit: Suit) => {
    switch(suit) {
      case 'Spades': return '♠';
      case 'Hearts': return '♥';
      case 'Diamonds': return '♦';
      case 'Clubs': return '♣';
      default: return '';
    }
  };

  return (
    <Flex direction="column" gap="6">
      <Card size="3" variant="surface" style={{ background: 'var(--gray-a2)', backdropFilter: 'blur(8px)' }}>
        <Flex direction="column" gap="4">
          <Flex align="center" gap="2">
            <LayoutIcon size={20} color="var(--accent-9)" />
            <Heading size="4">{t('validator.roundSelection')}</Heading>
          </Flex>
          <Box style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            <Tabs.Root 
              value={selectedRound.id.toString()} 
              onValueChange={(val) => setSelectedRound(SHANGHAI_ROUNDS.find(r => r.id.toString() === val)!)}
            >
              <Tabs.List size="2" color="jade" highContrast style={{ flexWrap: 'nowrap', minWidth: 'max-content' }}>
                {SHANGHAI_ROUNDS.map(r => (
                  <Tabs.Trigger key={r.id} value={r.id.toString()}>{t('game.round')} {r.id}</Tabs.Trigger>
                ))}
              </Tabs.List>
              <Box pt="4">
                <Flex align="center" gap="2">
                  <Info size={14} color="var(--gray-9)" />
                  <Text size="2" color="gray" weight="medium">{translateDescription(selectedRound.contracts)}</Text>
                </Flex>
              </Box>
            </Tabs.Root>
          </Box>
        </Flex>
      </Card>

      <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="6">
        {selectedRound.contracts.map((contract, i) => {
          const result = validateContract(i);
          return (
            <Card key={i} variant="surface" style={{ 
              transition: 'all 0.2s', 
              borderTop: result.isValid ? '4px solid var(--green-9)' : '4px solid var(--red-9)',
              background: 'var(--gray-a2)',
              backdropFilter: 'blur(8px)'
            }}>
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="1">
                    <Text size="3" weight="bold">{t(`game.${contract.type.toLowerCase()}`)} {t('game.of')} {contract.count}</Text>
                    <Text size="1" color="gray">{t('game.contract')} #{i + 1}</Text>
                  </Flex>
                  <Flex gap="2" align="center">
                    {result.isValid ? (
                      <Badge color="green" variant="soft" size="2" radius="full">
                        <CheckCircle size={12} style={{ marginRight: '4px' }} /> {t('validator.valid')}
                      </Badge>
                    ) : (
                      <Badge color="red" variant="soft" size="2" radius="full">
                        <XCircle size={12} style={{ marginRight: '4px' }} /> {t('validator.invalid')}
                      </Badge>
                    )}
                    <IconButton variant="ghost" color="gray" size="1" onClick={() => clearSlot(i)}>
                      <Trash2 size={14} />
                    </IconButton>
                  </Flex>
                </Flex>
                
                <Flex gap="3" wrap="wrap" minHeight="120px" style={{ 
                  background: 'var(--gray-a3)', 
                  padding: '12px', 
                  borderRadius: 'var(--radius-4)',
                  border: '1px solid var(--gray-a4)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  {slots[i].map((card, cardIndex) => (
                    <Box key={`${i}-${cardIndex}`} style={{ position: 'relative' }}>
                      <PlayingCard card={card} onClick={() => removeCard(i, cardIndex)} />
                    </Box>
                  ))}
                  {Array.from({ length: Math.max(0, contract.count - slots[i].length) }).map((_, gi) => (
                    <div key={gi} className="ghost-slot">+</div>
                  ))}
                </Flex>
                
                {!result.isValid && slots[i].length > 0 && (
                  <Callout.Root color="red" size="1" variant="soft">
                    <Callout.Icon><Info size={14} /></Callout.Icon>
                    <Callout.Text size="1">{result.errors[0]}</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Card>
          );
        })}
      </Grid>

      <Card size="3" variant="surface" style={{ background: 'var(--gray-a2)', backdropFilter: 'blur(8px)' }}>
        <Flex direction="column" gap="5">
          <Flex align="center" gap="2">
            <CreditCard size={20} color="var(--accent-9)" />
            <Heading size="4">{t('validator.cardLibrary')}</Heading>
          </Flex>
          
          <ScrollArea type="auto" scrollbars="horizontal" style={{ borderRadius: 'var(--radius-4)' }}>
            <Flex gap="6" p="2">
              {selectedRound.contracts.map((_, i) => (
                <Box key={i} minWidth="280px" p="4" style={{ background: 'var(--gray-a3)', borderRadius: 'var(--radius-4)', border: '1px solid var(--gray-a4)' }}>
                  <Heading size="2" color="gray" mb="4" align="center">{t('validator.addToSlot')} {i + 1}</Heading>
                  <Flex direction="column" gap="4">
                    <Button 
                      size="2" 
                      color="amber" 
                      variant="soft"
                      onClick={() => addCard(i, { id: Math.random().toString(), suit: 'Joker', rank: 'Joker', isJoker: true })}
                      style={{ width: '100%' }}
                    >
                      <Plus size={16} /> {t('validator.addJoker')}
                    </Button>
                    
                    <Separator size="4" />
                    
                    <Grid columns="1" gap="3">
                      {suits.map(s => (
                        <Flex key={s} gap="2" align="center">
                          <Text size="1" weight="bold" color={(s === 'Hearts' || s === 'Diamonds') ? 'red' : 'gray'} style={{ width: '12px' }}>
                            {getSuitIcon(s)}
                          </Text>
                          <Flex gap="1" wrap="wrap">
                            {ranks.map(r => (
                              <Tooltip content={`${r} of ${s}`} key={r}>
                                <IconButton 
                                  size="1"
                                  variant="surface"
                                  color={(s === 'Hearts' || s === 'Diamonds') ? 'red' : 'gray'}
                                  onClick={() => addCard(i, { id: Math.random().toString(), suit: s, rank: r, isJoker: false })}
                                  style={{ width: '24px', height: '24px', fontSize: '10px' }}
                                >
                                  {r}
                                </IconButton>
                              </Tooltip>
                            ))}
                          </Flex>
                        </Flex>
                      ))}
                    </Grid>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </ScrollArea>
        </Flex>
      </Card>

      {allValid && (
        <Callout.Root color="green" variant="soft" size="3" style={{ borderLeft: '4px solid var(--green-9)', background: 'var(--green-a2)', backdropFilter: 'blur(8px)' }}>
          <Callout.Icon>
            <CheckCircle size={24} />
          </Callout.Icon>
          <Callout.Text>
            <Flex direction="column" gap="4" p="1">
              <Box>
                <Heading size="4" mb="1" color="green">{t('validator.success')}</Heading>
                <Text size="3">{t('validator.successDesc', { round: translateRoundName(selectedRound.id) })}</Text>
              </Box>
              <Flex gap="4" align={{ initial: 'stretch', sm: 'center' }} direction={{ initial: 'column', sm: 'row' }}>
                <TextField.Root 
                  placeholder={t('validator.winnerPlaceholder')} 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  size="3"
                  variant="surface"
                  style={{ flexGrow: 1, minWidth: '200px', boxShadow: 'var(--shadow-2)' }}
                >
                  <TextField.Slot><UserCircle size={18} /></TextField.Slot>
                </TextField.Root>
                
                <Dialog.Root open={openTrophy} onOpenChange={setOpenTrophy}>
                  <Dialog.Trigger>
                    <Button color="green" size="3" variant="solid">
                      <Trophy size={18} style={{ marginRight: '4px' }} /> {t('validator.claimTrophy')}
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px" style={{ borderRadius: 'var(--radius-5)', background: 'var(--gray-1)', border: '1px solid var(--gray-a4)' }}>
                    <Flex direction="column" align="center" gap="5" py="6">
                      <Box style={{ 
                        background: 'var(--amber-a3)', 
                        padding: '24px', 
                        borderRadius: 'full',
                        color: 'var(--amber-9)',
                        boxShadow: '0 0 40px var(--amber-a4)'
                      }}>
                        <Trophy size={100} />
                      </Box>
                      <Flex direction="column" align="center" gap="2">
                        <Heading size="7" weight="bold">{t('validator.trophyTitle')}</Heading>
                        <Text align="center" size="4" color="gray" style={{ maxWidth: '300px' }}>
                          {t('validator.trophyDesc', { name: userName || 'Champion', round: translateRoundName(selectedRound.id) })}
                        </Text>
                      </Flex>
                      <Flex gap="3" mt="4" justify="center" width="100%">
                        <Dialog.Close>
                          <Button variant="soft" color="gray" size="3">Close</Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button size="3" color="jade">{t('validator.finish')}</Button>
                        </Dialog.Close>
                      </Flex>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Flex>
          </Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
};
