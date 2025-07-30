import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  List,
  Chip,
  FAB,
  Dialog,
  Portal,
  TextInput,
  ProgressBar
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Expense {
  id: string;
  category: 'accommodation' | 'food' | 'transport' | 'activities' | 'other';
  amount: number;
  description: string;
  date: string;
  currency: string;
}

interface Budget {
  daily: number;
  total: number;
  currency: string;
}

export default function BudgetScreen() {
  const [budget, setBudget] = useState<Budget>({
    daily: 50,
    total: 1500,
    currency: 'USD'
  });

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      category: 'accommodation',
      amount: 25,
      description: 'Hostel bed in Bangkok',
      date: '2024-01-15',
      currency: 'USD'
    },
    {
      id: '2',
      category: 'food',
      amount: 12,
      description: 'Street food dinner',
      date: '2024-01-15',
      currency: 'USD'
    },
    {
      id: '3',
      category: 'transport',
      amount: 8,
      description: 'Tuk-tuk to temple',
      date: '2024-01-15',
      currency: 'USD'
    }
  ]);

  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'food' as const,
    amount: '',
    description: '',
    currency: 'USD'
  });

  const todayExpenses = expenses.filter(expense => 
    expense.date === new Date().toISOString().split('T')[0]
  );
  
  const todayTotal = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const dailyProgress = todayTotal / budget.daily;
  const totalProgress = totalSpent / budget.total;

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        description: newExpense.description,
        date: new Date().toISOString().split('T')[0],
        currency: newExpense.currency
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ category: 'food', amount: '', description: '', currency: 'USD' });
      setShowExpenseDialog(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accommodation': return 'bed';
      case 'food': return 'food';
      case 'transport': return 'car';
      case 'activities': return 'ticket';
      default: return 'cash';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'accommodation': return '#9C27B0';
      case 'food': return '#FF5722';
      case 'transport': return '#2196F3';
      case 'activities': return '#4CAF50';
      default: return '#FF9800';
    }
  };

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Title>Budget Management</Title>
            <Paragraph>Track your travel expenses and stay within budget</Paragraph>
          </Card.Content>
        </Card>

        {/* Budget Overview */}
        <Card style={styles.budgetCard}>
          <Card.Content>
            <Title>Budget Overview</Title>
            
            <View style={styles.budgetRow}>
              <Paragraph>Daily Budget:</Paragraph>
              <Title>${budget.daily} {budget.currency}</Title>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Paragraph>Today's Spending: ${todayTotal.toFixed(2)}</Paragraph>
                <Paragraph style={[styles.progressText, dailyProgress > 1 && styles.overBudget]}>
                  {(dailyProgress * 100).toFixed(0)}%
                </Paragraph>
              </View>
              <ProgressBar 
                progress={Math.min(dailyProgress, 1)} 
                color={dailyProgress > 1 ? '#F44336' : '#4CAF50'}
                style={styles.progressBar}
              />
            </View>

            <View style={styles.budgetRow}>
              <Paragraph>Total Budget:</Paragraph>
              <Title>${budget.total} {budget.currency}</Title>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Paragraph>Total Spent: ${totalSpent.toFixed(2)}</Paragraph>
                <Paragraph style={[styles.progressText, totalProgress > 1 && styles.overBudget]}>
                  {(totalProgress * 100).toFixed(0)}%
                </Paragraph>
              </View>
              <ProgressBar 
                progress={Math.min(totalProgress, 1)} 
                color={totalProgress > 1 ? '#F44336' : '#4CAF50'}
                style={styles.progressBar}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setShowBudgetDialog(true)}>Edit Budget</Button>
          </Card.Actions>
        </Card>

        {/* Category Breakdown */}
        <Title style={styles.sectionTitle}>Spending by Category</Title>
        
        <View style={styles.categoryContainer}>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <Card key={category} style={styles.categoryCard}>
              <Card.Content style={styles.categoryContent}>
                <MaterialCommunityIcons 
                  name={getCategoryIcon(category) as any} 
                  size={24} 
                  color={getCategoryColor(category)} 
                />
                <View style={styles.categoryInfo}>
                  <Paragraph style={styles.categoryName}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Paragraph>
                  <Title style={styles.categoryAmount}>${total.toFixed(2)}</Title>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Recent Expenses */}
        <Title style={styles.sectionTitle}>Recent Expenses</Title>
        
        {expenses.slice(0, 5).map((expense) => (
          <Card key={expense.id} style={styles.expenseCard}>
            <Card.Content>
              <View style={styles.expenseHeader}>
                <MaterialCommunityIcons 
                  name={getCategoryIcon(expense.category) as any} 
                  size={20} 
                  color={getCategoryColor(expense.category)} 
                />
                <View style={styles.expenseInfo}>
                  <Paragraph style={styles.expenseDescription}>{expense.description}</Paragraph>
                  <Paragraph style={styles.expenseDate}>{expense.date}</Paragraph>
                </View>
                <Title style={styles.expenseAmount}>
                  ${expense.amount.toFixed(2)}
                </Title>
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Budget Features */}
        <Card style={styles.featuresCard}>
          <Card.Content>
            <Title>Budget Features</Title>
            <List.Item
              title="Multi-Currency Support"
              description="Track expenses in different currencies with auto-conversion"
              left={() => <List.Icon icon="currency-usd" />}
            />
            <List.Item
              title="Smart Notifications"
              description="Get alerts when approaching daily or total budget limits"
              left={() => <List.Icon icon="bell-ring" />}
            />
            <List.Item
              title="Expense Analytics"
              description="Visual charts and insights into your spending patterns"
              left={() => <List.Icon icon="chart-line" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowExpenseDialog(true)}
        label="Add Expense"
      />

      {/* Add Expense Dialog */}
      <Portal>
        <Dialog visible={showExpenseDialog} onDismiss={() => setShowExpenseDialog(false)}>
          <Dialog.Title>Add Expense</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Description"
              value={newExpense.description}
              onChangeText={(text) => setNewExpense({...newExpense, description: text})}
              style={styles.input}
            />
            <TextInput
              label="Amount"
              value={newExpense.amount}
              onChangeText={(text) => setNewExpense({...newExpense, amount: text})}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.categorySelector}>
              {['accommodation', 'food', 'transport', 'activities', 'other'].map((category) => (
                <Chip
                  key={category}
                  selected={newExpense.category === category}
                  onPress={() => setNewExpense({...newExpense, category: category as any})}
                  style={styles.categoryChip}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowExpenseDialog(false)}>Cancel</Button>
            <Button onPress={addExpense}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Edit Budget Dialog */}
      <Portal>
        <Dialog visible={showBudgetDialog} onDismiss={() => setShowBudgetDialog(false)}>
          <Dialog.Title>Edit Budget</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Daily Budget"
              value={budget.daily.toString()}
              onChangeText={(text) => setBudget({...budget, daily: parseFloat(text) || 0})}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Total Budget"
              value={budget.total.toString()}
              onChangeText={(text) => setBudget({...budget, total: parseFloat(text) || 0})}
              keyboardType="numeric"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowBudgetDialog(false)}>Cancel</Button>
            <Button onPress={() => setShowBudgetDialog(false)}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    backgroundColor: '#6200EE',
  },
  sectionTitle: {
    marginVertical: 16,
    color: '#333',
  },
  budgetCard: {
    marginBottom: 16,
    elevation: 2,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  progressContainer: {
    marginVertical: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontWeight: 'bold',
  },
  overBudget: {
    color: '#F44336',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    elevation: 1,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryInfo: {
    marginLeft: 8,
    flex: 1,
  },
  categoryName: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  categoryAmount: {
    fontSize: 16,
  },
  expenseCard: {
    marginBottom: 8,
    elevation: 1,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseInfo: {
    marginLeft: 8,
    flex: 1,
  },
  expenseDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#6200EE',
  },
  featuresCard: {
    marginTop: 16,
    marginBottom: 80,
  },
  input: {
    marginBottom: 8,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  categoryChip: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});