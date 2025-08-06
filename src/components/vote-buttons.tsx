'use client';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/auth-provider';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  appId: string;
}

export function VoteButtons({ initialUpvotes, initialDownvotes, appId }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleVote = (voteType: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to vote.',
        variant: 'destructive',
      });
      return;
    }

    if (voteType === 'up') {
      if (userVote === 'up') {
        // Remove upvote
        setUpvotes(upvotes - 1);
        setUserVote(null);
      } else {
        setUpvotes(upvotes + 1);
        if (userVote === 'down') {
          setDownvotes(downvotes - 1);
        }
        setUserVote('up');
      }
    } else { // voteType is 'down'
      if (userVote === 'down') {
        // Remove downvote
        setDownvotes(downvotes - 1);
        setUserVote(null);
      } else {
        setDownvotes(downvotes + 1);
        if (userVote === 'up') {
          setUpvotes(upvotes - 1);
        }
        setUserVote('down');
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={userVote === 'up' ? 'default' : 'outline'}
        size="lg"
        onClick={() => handleVote('up')}
        aria-label="Upvote"
        className="w-full"
      >
        <ArrowUp className={cn('mr-2 h-5 w-5', userVote === 'up' && 'text-white')} />
        <span className="text-lg font-semibold">{upvotes.toLocaleString()}</span>
      </Button>
      <Button
        variant={userVote === 'down' ? 'destructive' : 'outline'}
        size="lg"
        onClick={() => handleVote('down')}
        aria-label="Downvote"
        className="w-full"
      >
        <ArrowDown className={cn('mr-2 h-5 w-5', userVote === 'down' && 'text-white')} />
        <span className="text-lg font-semibold">{downvotes.toLocaleString()}</span>
      </Button>
    </div>
  );
}
