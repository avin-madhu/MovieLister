#include<stdio.h>
#include<unistd.h>
int main()
{
    int arr[100],n,id;
    int sumEven=0,sumOdd=0;
    printf("Enter the limit: ");
    scanf("%d",&n);
    int check=fork();
    if(check==0)
    {
        id=getppid();
        for(int i=0;i<n;i++)
        {
            if(i%2==0)
            {
              sumEven+=i;
            }
        }
    }
    printf("The sum of even numbers: %d/n ",sumEven);
    printf("The child id: %d\n\n",id);

    if(check!=0)
    {
        int id = getpid();
        for(int i=0;i<n;i++)
        {
            if(i%2!=0)
            {
              sumOdd+=i;
            }
        }
         printf("The sum of odd numbers: %d/n ",sumOdd);
    printf("The parent id: %d\n\n",id);
    }
    return 0;
}