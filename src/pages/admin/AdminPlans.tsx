import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash, Check, X } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  isActive: boolean;
};

const defaultPlans: Plan[] = [
  {
    id: '1',
    name: 'Basic',
    description: 'Entry level plan for beginners',
    price: '9.99',
    features: ['Up to 30 ads per day', '5% referral commission', 'Regular support'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Pro',
    description: 'Our most popular plan for serious users',
    price: '19.99',
    features: ['Up to 60 ads per day', '10% referral commission', 'Priority support', 'Analytics dashboard'],
    isActive: true,
  },
  {
    id: '3',
    name: 'Premium',
    description: 'Elite plan with maximum earning potential',
    price: '29.99',
    features: ['Unlimited ads per day', '15% referral commission', 'Premium support', 'Advanced analytics', 'Exclusive offers'],
    isActive: true,
  },
];

const AdminPlans: React.FC = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    name: '',
    description: '',
    price: '',
    features: [''],
    isActive: true,
  });
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleAddNewPlan = () => {
    setIsEditMode(false);
    setNewPlan({
      name: '',
      description: '',
      price: '',
      features: [''],
      isActive: true,
    });
    setIsDialogOpen(true);
  };
  
  const handleEditPlan = (plan: Plan) => {
    setIsEditMode(true);
    setEditingPlan(plan);
    setIsDialogOpen(true);
  };
  
  const handleSavePlan = () => {
    if (isEditMode && editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      toast({
        title: "Plan updated",
        description: `The ${editingPlan.name} plan has been updated`,
      });
    } else {
      const newId = (Math.max(...plans.map(p => parseInt(p.id))) + 1).toString();
      setPlans([...plans, { ...newPlan, id: newId }]);
      toast({
        title: "Plan created",
        description: `The ${newPlan.name} plan has been created`,
      });
    }
    setIsDialogOpen(false);
  };
  
  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
    toast({
      title: "Plan deleted",
      description: "The plan has been deleted",
      variant: "destructive",
    });
  };
  
  const handleTogglePlanStatus = (id: string) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    }));
    
    const plan = plans.find(p => p.id === id);
    toast({
      title: plan?.isActive ? "Plan deactivated" : "Plan activated",
      description: `The ${plan?.name} plan has been ${plan?.isActive ? 'deactivated' : 'activated'}`,
    });
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    if (isEditMode && editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({ ...editingPlan, features: newFeatures });
    } else {
      const newFeatures = [...newPlan.features];
      newFeatures[index] = value;
      setNewPlan({ ...newPlan, features: newFeatures });
    }
  };
  
  const addFeature = () => {
    if (isEditMode && editingPlan) {
      setEditingPlan({ 
        ...editingPlan, 
        features: [...editingPlan.features, ''] 
      });
    } else {
      setNewPlan({ 
        ...newPlan, 
        features: [...newPlan.features, ''] 
      });
    }
  };
  
  const removeFeature = (index: number) => {
    if (isEditMode && editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures.splice(index, 1);
      setEditingPlan({ ...editingPlan, features: newFeatures });
    } else {
      const newFeatures = [...newPlan.features];
      newFeatures.splice(index, 1);
      setNewPlan({ ...newPlan, features: newFeatures });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Plans</h2>
          <p className="text-muted-foreground">
            Create and manage subscription plans for your users
          </p>
        </div>
        <Button onClick={handleAddNewPlan}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Plan
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map(plan => (
          <Card key={plan.id} className={`${!plan.isActive ? 'opacity-70' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="flex items-center justify-between">
                ${plan.price}/month
                <div className="flex items-center space-x-1">
                  <span className="text-xs">{plan.isActive ? 'Active' : 'Inactive'}</span>
                  <Switch 
                    checked={plan.isActive}
                    onCheckedChange={() => handleTogglePlanStatus(plan.id)}
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{plan.description}</p>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm flex">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-xs text-muted-foreground">
                ID: {plan.id}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update the details for this subscription plan.'
                : 'Create a new subscription plan for your users.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Plan Name</label>
              <Input 
                id="name" 
                value={isEditMode ? editingPlan?.name : newPlan.name}
                onChange={(e) => {
                  if (isEditMode && editingPlan) {
                    setEditingPlan({ ...editingPlan, name: e.target.value });
                  } else {
                    setNewPlan({ ...newPlan, name: e.target.value });
                  }
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                value={isEditMode ? editingPlan?.description : newPlan.description}
                onChange={(e) => {
                  if (isEditMode && editingPlan) {
                    setEditingPlan({ ...editingPlan, description: e.target.value });
                  } else {
                    setNewPlan({ ...newPlan, description: e.target.value });
                  }
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">Price ($/month)</label>
              <Input 
                id="price" 
                value={isEditMode ? editingPlan?.price : newPlan.price}
                onChange={(e) => {
                  if (isEditMode && editingPlan) {
                    setEditingPlan({ ...editingPlan, price: e.target.value });
                  } else {
                    setNewPlan({ ...newPlan, price: e.target.value });
                  }
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Features</label>
              <div className="space-y-2">
                {(isEditMode ? editingPlan?.features : newPlan.features).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeature(index)}
                      disabled={(isEditMode ? editingPlan?.features : newPlan.features).length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={addFeature}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isActive"
                checked={isEditMode ? editingPlan?.isActive : newPlan.isActive}
                onCheckedChange={(checked) => {
                  if (isEditMode && editingPlan) {
                    setEditingPlan({ ...editingPlan, isActive: checked });
                  } else {
                    setNewPlan({ ...newPlan, isActive: checked });
                  }
                }}
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePlan}>
              {isEditMode ? 'Update Plan' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPlans;
